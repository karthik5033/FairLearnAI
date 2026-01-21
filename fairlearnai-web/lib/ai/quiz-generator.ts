export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export interface Quiz {
    topic: string;
    difficulty: string;
    questions: QuizQuestion[];
}

export function generateQuizPrompt(topic: string, difficulty: string, count: number): string {
    return `
You are an expert educational AI. Generate a quiz for a student.

Topic: ${topic}
Difficulty: ${difficulty}
Number of Questions: ${count}

REQUIREMENTS:
1. Output strictly valid JSON.
2. The JSON structure must be:
{
    "topic": "${topic}",
    "difficulty": "${difficulty}",
    "questions": [
        {
            "id": 1,
            "question": "Question text here...",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswerIndex": 0, // 0-based index of correct option
            "explanation": "Brief explanation of why this is correct."
        }
    ]
}
3. Ensure options are distinct.
4. Explanations should be helpful and educational.
5. Do NOT include markdown code blocks (like \`\`\`json). Just the raw JSON string.
6. IMPORTANT: If using math symbols, strictly use double backslashes (e.g. "\\sqrt{x}" not "\sqrt{x}").
7. Ensure all strings are properly escaped for JSON.
`;
}

export function generateQuizFromMaterialPrompt(material: string, count: number): string {
    return `
You are an expert educational AI. Generate a quiz based STRICTLY on the provided study material.

STUDY MATERIAL:
"""
${material.slice(0, 10000)} 
"""

Number of Questions: ${count}

REQUIREMENTS:
1. Output strictly valid JSON.
2. The JSON structure must be:
{
    "topic": "Derived from Material",
    "difficulty": "Mixed",
    "questions": [
        {
            "id": 1,
            "question": "Question text here...",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswerIndex": 0,
            "explanation": "Brief explanation referencing the material."
        }
    ]
}
3. Questions must be answerable using ONLY the provided text.
4. Do NOT include markdown code blocks. Just the raw JSON string.
5. IMPORTANT: If using math symbols, strictly use double backslashes (e.g. "\\sqrt{x}" not "\sqrt{x}").
6. Ensure all strings are properly escaped for JSON.
`;
}
