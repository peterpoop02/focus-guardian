# Focus Guardian

## Overview
Focus Guardian is a web application that helps users improve focus using sensor data, timers, and task management.

---

## Features
- Focus status tracking (motion + light)
- Pomodoro session counter
- Custom timer
- Daily goal tracker
- Focus score graph
- Todo list

---

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- Node.js (API routes)

---

## Installation

1. Install dependencies:
npm install

2. Run the project:
npm run dev

3. Open:
http://localhost:3000

---

## Environment Variables

Create `.env.local`:

NEXT_PUBLIC_API_URL=http://localhost:3000

---

## API

GET /api/sensor

Returns sensor data:
- motion
- light
- focus_status
- score

---

## Hardware
- Motion sensor
- Light sensor
- Simulated using Wokwi

## Notes
Make sure Node.js is installed before running the project.

---

## Team
- Swan Htet Aung - 6731502019   
- Min Thant Kyaw - 6731502020