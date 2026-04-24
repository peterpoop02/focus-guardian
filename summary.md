# Focus Guardian: Smart Study Productivity Tracker

## 1. Executive Summary

This project addresses the problem of ineffective study habits among university students. Many students believe they are studying productively, but in reality, they experience frequent distractions without awareness.

Using the Design Thinking framework:

* **Empathize:** Students struggle with maintaining focus and tracking real study time.
* **Define:** Lack of awareness of distractions leads to poor productivity.
* **Ideate:** Develop a system that tracks study behavior using environmental and presence data.
* **Prototype:** An IoT-based system using motion and light sensors connected to a web dashboard.
* **Test:** Simulated real-time data was used to validate system behavior and user interaction.

The solution, *Focus Guardian*, uses simulated IoT sensor data to determine focus levels and display them in real-time via a web dashboard.

---

## 2. System Architecture

### Overview

Sensors → ESP32 → MQTT → Backend API → Web Dashboard

### Current Implementation (Simulation)

Mock Sensor Data → API Route → Next.js Frontend

---

## 3. Tech Stack

* Frontend: Next.js (React)
* Backend: Next.js API Routes
* Language: TypeScript
* Styling: Tailwind CSS
* IoT Simulation: Mock Data (simulating ESP32 + MQTT)

---

## 4. System Diagram (Text Representation)

[ Sensor Layer ]

* Motion Sensor (PIR)
* Light Sensor (LDR)

  ```
    ↓
  ```

[ Microcontroller ]

* ESP32

  ```
    ↓
  ```

[ Communication ]

* MQTT Protocol

  ```
    ↓
  ```

[ Backend ]

* API Route (/api/sensor)

  ```
    ↓
  ```

[ Frontend ]

* Next.js Dashboard

---

## 5. Data Format (MQTT JSON)

```json
{
  "device_id": "focus_guardian_01",
  "motion": 1,
  "light": 320,
  "score": 100,
  "focus_status": "Focused",
  "timestamp": "2026-04-24T14:30:00Z"
}
```

---

## 6. Key Features & Implementation

### Features:

* Real-time focus detection
* Focus scoring system
* Environmental awareness (light levels)
* Dashboard visualization

### Logic:

* Motion detected + good lighting → Focused
* Otherwise → Distracted

### Implementation:

* API generates simulated sensor data
* Frontend fetches data every 2 seconds
* UI updates dynamically

(Screenshot: Dashboard UI here)
(Screenshot: API JSON here)

---

## 7. Challenges & Solutions

| Challenge            | Solution                      |
| -------------------- | ----------------------------- |
| No hardware access   | Simulated IoT data via API    |
| Real-time updates    | Used interval-based polling   |
| Data inconsistency   | Applied simple scoring logic  |
| Limited time (1 day) | Focused on core features only |

---

## 8. Conclusion & Future Scope

### Conclusion:

This project demonstrates how IoT concepts can be applied to improve student productivity through real-time monitoring and feedback.

### Future Improvements:

* Integrate real ESP32 hardware
* Use actual MQTT broker
* Add mobile app support
* AI-based focus prediction

---

## 9. Team

Name: [Swan Htet Aung]
Role: Full-stack Developer (Frontend, Backend, IoT Simulation, UX)

Name: [Min Thant Kyaw]
Role: Full-stack Developer (Frontend, Backend, IoT Simulation, UX)

---

## 10. Repository

GitHub Link: [Add your repo link here]

---
