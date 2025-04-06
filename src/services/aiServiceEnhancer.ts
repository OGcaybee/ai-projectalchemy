
import { enhanceProjectContent } from './aiProjectGenerator';
import { optimizeContent } from './contentOptimizer';

/**
 * Enhances the project content with additional features
 * based on the user's prompt
 */
export const enhanceProjectContent = async (
  prompt: string, 
  initialContent: { html: string; css: string; js: string }
) => {
  try {
    // First, enhance the content with AI-generated improvements
    const enhancedContent = await import('./aiProjectGenerator').then(
      module => module.enhanceProjectContent(prompt, initialContent)
    );
    
    // Then optimize the enhanced content for performance and quality
    const optimizedContent = await import('./contentOptimizer').then(
      module => module.optimizeContent(enhancedContent)
    );
    
    return optimizedContent;
  } catch (error) {
    console.error("Error enhancing project content:", error);
    // Return the initial content if enhancement fails
    return initialContent;
  }
};

export default {
  enhanceProjectContent
};
