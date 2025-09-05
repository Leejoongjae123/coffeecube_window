import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      equipment_command_id,
      input_amount,
      input_type,
      input_date,
      robot_code,
    } = body;

    // 필수 필드 검증
    if (!input_amount || !input_type) {
      return NextResponse.json(
        { error: "투입량과 투입 타입은 필수입니다." },
        { status: 400 }
      );
    }

    // 투입량이 양수인지 확인
    if (input_amount <= 0) {
      return NextResponse.json(
        { error: "투입량은 0보다 커야 합니다." },
        { status: 400 }
      );
    }

    const today = input_date || new Date().toISOString().split("T")[0];

    // 오늘 총 투입량 조회
    const { data: todayRecords, error: queryError } = await supabase
      .from("input_records")
      .select("input_amount")
      .eq("user_id", user.id)
      .eq("input_date", today);

    if (queryError) {
      return NextResponse.json(
        { error: "오늘 투입량 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    // 오늘 총 투입량 계산
    const todayTotalAmount = todayRecords.reduce(
      (sum, record) => sum + Number(record.input_amount),
      0
    );

    // 새로운 투입 후 총량 계산
    const newTotalAmount = todayTotalAmount + Number(input_amount);

    // 투입 기록 생성
    const { data, error } = await supabase
      .from("input_records")
      .insert({
        user_id: user.id,
        equipment_command_id: equipment_command_id || null,
        input_amount,
        input_type,
        input_date: today,
        robot_code: robot_code || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "투입 기록 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    // robot_code가 있는 경우 equipment_list의 last_used_at 업데이트
    if (robot_code) {
      const { error: equipmentUpdateError } = await supabase
        .from("equipment_list")
        .update({
          last_used_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("robot_code", robot_code);

      // equipment_list 업데이트 실패는 로그만 남기고 계속 진행
      if (equipmentUpdateError) {
        console.log(
          "Equipment last_used_at 업데이트 실패:",
          equipmentUpdateError
        );
      }
    }

    // equipment_status 테이블에 장비명령 기록 저장
    const inputTypeMapping: { [key: string]: string } = {
      coffee_bean: "원두",
      water: "물",
      milk: "우유",
      syrup: "시럽",
      other: "기타",
    };

    const actionName = `${inputTypeMapping[input_type] || input_type} 투입`;
    const actionResponse = `${input_amount}kg ${
      inputTypeMapping[input_type] || input_type
    } 투입 완료`;

    // 현재 장비 상태를 가져와서 업데이트
    const { data: currentStatus } = await supabase
      .from("equipment_status")
      .select("*")
      .eq("equipment_id", "EQUIPMENT_001")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // 새로운 equipment_status 레코드 생성 (장비명령 기록 포함)
    const { error: statusError } = await supabase
      .from("equipment_status")
      .insert({
        equipment_id: "EQUIPMENT_001",
        total_weight: currentStatus?.total_weight || 0,
        temperature: currentStatus?.temperature || 5,
        device_status: currentStatus?.device_status || "정상",
        action_name: actionName,
        action_response: actionResponse,
      });

    // equipment_status 저장 실패는 로그만 남기고 계속 진행
    if (statusError) {
      console.log("Equipment status 저장 실패:", statusError);
    }

    // 포인트 계산 로직 (하루 최대 2kg까지만 포인트 지급)
    const pointEligibleAmount =
      Math.min(newTotalAmount, 2.0) - Math.min(todayTotalAmount, 2.0);

    if (pointEligibleAmount > 0) {
      // 포인트 지급 (1kg당 10포인트)
      const pointsToEarn = Math.floor(pointEligibleAmount * 10);

      // 포인트 기록 생성
      const { error: pointError } = await supabase.from("user_points").insert({
        user_id: user.id,
        points_earned: pointsToEarn,
        points_source: "input_reward",
        source_reference_id: data.id,
        earned_date: today,
      });

      if (pointError) {
        // 포인트 생성 실패해도 투입 기록은 유지
        return NextResponse.json(
          {
            message: "투입 기록이 생성되었지만 포인트 지급에 실패했습니다.",
            record: data,
            pointsEarned: 0,
          },
          { status: 201 }
        );
      }

      return NextResponse.json(
        {
          message: "투입 기록이 생성되었습니다.",
          record: data,
          pointsEarned: pointsToEarn,
          pointEligibleAmount: pointEligibleAmount,
          dailyTotal: newTotalAmount,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "투입 기록이 생성되었습니다. (일일 포인트 한도 도달)",
          record: data,
          pointsEarned: 0,
          dailyTotal: newTotalAmount,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const input_type = searchParams.get("input_type");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase
      .from("input_records")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (input_type) {
      query = query.eq("input_type", input_type);
    }

    if (start_date) {
      query = query.gte("input_date", start_date);
    }

    if (end_date) {
      query = query.lte("input_date", end_date);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "투입 기록 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ records: data });
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
