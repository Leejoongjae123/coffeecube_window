import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const supabase = await createClient();

    // 로그인 시도
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return NextResponse.json(
        {
          success: false,
          error: "login_failed",
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        { status: 401 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        {
          success: false,
          error: "user_not_found",
          message: "사용자를 찾을 수 없습니다.",
        },
        { status: 401 }
      );
    }

    // 사용자 프로필에서 role 확인
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          error: "profile_not_found",
          message: "사용자 프로필을 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    // 관리자 권한 확인
    if (profile.role !== "admin") {
      // 관리자가 아닌 경우 로그아웃 처리
      await supabase.auth.signOut();

      return NextResponse.json(
        {
          success: false,
          error: "insufficient_permissions",
          message: "관리자 계정으로 로그인해주세요.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "로그인이 완료되었습니다.",
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role: profile.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "server_error",
        message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
