import { NextResponse } from "next/server";

export async function GET() {
  const motion = Math.random() > 0.3 ? 1 : 0;
  const light = Math.floor(Math.random() * 500);

  let score = 0;
  if (motion === 1) score += 50;
  if (light > 200) score += 50;

  const focus_status = score >= 70 ? "Focused" : "Distracted";

  return NextResponse.json({
    device_id: "focus_guardian_01",
    motion,
    light,
    score,
    focus_status,
    timestamp: new Date().toISOString(),
  });
}