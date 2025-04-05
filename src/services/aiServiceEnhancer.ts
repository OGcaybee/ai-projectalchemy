
import { GeneratedProject } from '@/services/aiService';
import cssGenerationService from '@/services/cssGenerationService';

// Enhanced project service with additional features
export const enhanceAiService = (project: GeneratedProject): GeneratedProject => {
  // Add CSS to the project if it's not already there
  if (!project.css || project.css.length < 100) {
    project.css = cssGenerationService.generateProjectCss(project.requirements);
  }
  
  // Enhance HTML with proper structure if needed
  project.html = ensureProperHtmlStructure(project.html);

  // Enhance JavaScript with proper error handling and organization
  project.js = enhanceJavaScript(project.js);
  
  return project;
};

// Make sure the HTML has a proper document structure
const ensureProperHtmlStructure = (html: string): string => {
  if (!html) return '';
  
  // If HTML doesn't contain doctype, add a minimal HTML structure
  if (!html.includes('<!DOCTYPE html>')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Project</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    ${html}
    <script src="script.js"></script>
</body>
</html>`;
  }
  
  return html;
};

// Enhance JavaScript with better organization and error handling
const enhanceJavaScript = (js: string): string => {
  if (!js) return '';
  
  // Add IIFE to avoid global scope pollution if not already present
  if (!js.includes('(function() {') && !js.includes('(() => {')) {
    js = `// Immediately Invoked Function Expression to avoid global scope pollution
(function() {
  'use strict';
  
  // Main application code
  ${js}
  
  // Initialize app when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Call init function if it exists
    if (typeof init === 'function') {
      try {
        init();
      } catch (error) {
        console.error('Error initializing application:', error);
      }
    }
  });
})();`;
  }
  
  return js;
};

// Export utility functions
export default {
  enhanceAiService,
  ensureProperHtmlStructure,
  enhanceJavaScript
};
