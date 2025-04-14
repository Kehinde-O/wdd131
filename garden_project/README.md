# Lagos Garden Guide

A comprehensive website for beginner and intermediate gardeners in Lagos, Nigeria. This site provides location-specific information about growing vegetables and maintaining indoor plants in Lagos' unique climate.

## Project Description

This project was created by Kehinde Omotoso as the final website project for WDD131, demonstrating the application of HTML, CSS, and JavaScript skills. The website is designed to be responsive, accessible, and follows web development best practices.

## Features

- Responsive design for mobile and desktop views
- Lazy loading for optimized image loading
- Interactive elements using JavaScript
- Form validation and data storage using localStorage
- Filtering and tab functionality for better user experience

## Pages

1. **Home**: Introduction to the site and featured content
2. **Getting Started**: Basic information for new gardeners in Lagos
3. **Indoor Plants**: Guide to growing and maintaining indoor plants
4. **Vegetables**: Information about growing vegetables in Lagos (to be implemented)
5. **Local Tips**: Location-specific gardening advice (to be implemented)

## Technologies Used

- HTML5
- CSS3 (with Grid and Flexbox for layout)
- JavaScript (ES6+)
- Local Storage API

## Setup and Usage

1. Clone the repository
2. Open index.html in a web browser
3. Navigate through the site using the menu

## Future Enhancements

- Complete the Vegetables and Local Tips pages
- Add search functionality
- Implement user accounts for saving preferences
- Add a community forum for Lagos gardeners

## Recent Optimizations

### UI/UX Improvements

We've recently implemented several enhancements to improve the readability and visual appeal of the garden project:

1. **Enhanced Component Styling**
   - Cards with subtle hover effects and visual indicators
   - Timeline components with improved visual hierarchy
   - Accordion sections with smooth animations
   - Tab interfaces with better spacing and visual feedback

2. **Animation Effects**
   - Scroll-triggered animations for a more dynamic experience
   - Staggered animations for grouped elements
   - Respects user preferences with reduced motion support

3. **Structural Improvements**
   - Better spacing between page sections
   - Improved typography with better readability
   - Visual hierarchy enhancements for headings and content
   - More consistent styling across all pages

### Applying These Optimizations to Other Pages

To ensure consistency across the site, follow these guidelines when creating or updating pages:

1. **Card Components**
   - Use the `.card` class for content cards
   - Include `.card-img`, `.card-content`, and `.card-footer` sections
   - Add hover effects with `.card:hover` styling

2. **Tab Interfaces**
   - Use the `.care-tabs` container
   - Structure with `.tab-buttons` and `.tab-content` sections
   - Use `.tab-btn` for navigation buttons and `.tab-pane` for content panels

3. **Accordions**
   - Use the `.accordion` container with `.accordion-item` elements
   - Include `.accordion-header` with `.accordion-title` and `.accordion-icon`
   - Add content in `.accordion-content` sections

4. **Timeline Components**
   - Use the `.timeline` container with `.timeline-item` elements
   - Include `.timeline-content` with headings and content
   - Add `.timeline-dot` elements for visual markers

5. **Section Styling**
   - Maintain consistent spacing with `margin-bottom: var(--space-xxl)` on sections
   - Use the enhanced section heading styles with left borders
   - Include descriptive paragraph text below headings

These optimizations have been applied to the Local Tips page and should be consistently implemented across all other pages for a cohesive user experience.

## Credits

Created by Kehinde John Omotoso for WDD131.