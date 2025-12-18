joaorizzo0112 | Modern Web Calculator 🧮

A high-performance interactive calculator featuring a sophisticated dual-theme interface and real-time evaluation logic. This project demonstrates the application of modern JavaScript design patterns, local data manipulation logic, and a focus on high-fidelity UI/UX.

🎯 Technical Core & Architecture
This calculator was engineered to handle complex user interactions with precision:

State Management: Implements a centralized state logic to manage current inputs, historical expressions, and evaluation flags.

Theming Engine: Utilizes CSS Custom Properties integrated with a JavaScript toggle listener to provide seamless transitions between Light and Dark modes.

Sanitized Evaluation: Uses a custom string manipulation pipeline to safely parse visual symbols (÷, ×, −) into standard JavaScript operators before processing the calculation.

Event Delegation: Optimized performance by using a single event listener on the parent container (.pad) to manage button interactions via data-value and data-action attributes.

🛠️ Tech Stack & Implementation Details
Logic: Vanilla JavaScript (ES6+) focusing on synchronous processing and string manipulation.

Interface: CSS3 Grid Layout for a responsive and precisely aligned keypad.

Keyboard Accessibility: Full support for physical keyboard input, including numbers, operators, Enter, and Backspace.

Productivity: Integration of the browser's native Clipboard API for instant result copying.

🧠 Engineering Challenges Overcome
Edge Case Handling: Implemented logic to prevent consecutive operators and ensure decimal point integrity.

Visual Fidelity: Modern design featuring soft shadows and adaptive contrasts for both themes.

Editing Experience: Developed a custom backspace function for precise character-by-character editing.

This project is part of my personal Computer Science Lab, focusing on Software Quality and Frontend Architecture.
