from langchain_ollama import ChatOllama

# Initialize your local model here
# We set a low temperature (0.2) so the nutrition advice is factual and consistent, not overly creative.
llm = ChatOllama(
    model="qwen2:7b", 
    temperature=0.2,
)