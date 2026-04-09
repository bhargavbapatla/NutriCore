from app.ai.llm import llm
from langchain_core.prompts import ChatPromptTemplate
from typing import AsyncGenerator

_GOALS = {0: "Lose weight", 1: "Build muscle", 2: "Maintain and tone", 3: "Improve cardiovascular health"}
_ACTIVITY_LEVELS = {0: "Sedentary", 1: "Lightly active", 2: "Moderately active", 3: "Very active"}

_SYSTEM_PROMPT = """You are NutriCore, an elite, multi-agent AI fitness and nutrition orchestrator.
Your tone is highly professional, encouraging, and scientific.

Here is the user's baseline data from their onboarding questionnaire:
- Weight: {weight} kg
- Goal: {goal}
- Activity Level: {activity}
- Sleep: {sleep} hours/night

Based ONLY on this data, write a brief, highly personalized welcome assessment for their dashboard.
1. Acknowledge their specific goal.
2. Provide a high-level, immediate strategy (e.g., macro balance, sleep adjustments).
3. Let them know the 6 specialized agents are ready to assist.

Format the response in clean Markdown. Keep it under 3 short paragraphs."""


def _build_chain(user):
    inputs = {
        "weight": user.weight,
        "goal": _GOALS.get(user.goal, "General fitness"),
        "activity": _ACTIVITY_LEVELS.get(user.activity_level, "Moderate"),
        "sleep": user.sleep_hours,
    }
    prompt = ChatPromptTemplate.from_messages([
        ("system", _SYSTEM_PROMPT),
        ("user", "Please generate my personalized dashboard assessment.")
    ])
    return prompt | llm, inputs


async def stream_dashboard_assessment(user) -> AsyncGenerator[str, None]:
    """Streams tokens from the LLM as they are generated."""
    chain, inputs = _build_chain(user)
    async for chunk in chain.astream(inputs):
        if chunk.content:
            yield chunk.content
