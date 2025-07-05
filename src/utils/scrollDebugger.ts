// Debug utility for scroll investigation
export interface ElementDebugInfo {
  tagName: string;
  id: string;
  className: string;
  height: number;
  scrollHeight: number;
  clientHeight: number;
  offsetHeight: number;
  overflow: string;
  overflowY: string;
  overflowX: string;
  position: string;
  zIndex: string;
  display: string;
  flex: string;
  flexDirection: string;
  flexGrow: string;
  flexShrink: string;
  flexBasis: string;
  minHeight: string;
  maxHeight: string;
  width: number;
  scrollWidth: number;
  clientWidth: number;
  offsetWidth: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
  transform: string;
  visibility: string;
  opacity: string;
  pointerEvents: string;
}

export interface ScrollBlockerAnalysis {
  element: Element;
  selector: string;
  reasons: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  fixes: string[];
}

export interface LayoutAnalysis {
  scrollableAncestors: Element[];
  fixedPositionElements: Element[];
  flexContainers: Element[];
  gridContainers: Element[];
  overflowHiddenElements: Element[];
  heightConstrainedElements: Element[];
  totalPageHeight: number;
  viewportHeight: number;
  isPageScrollable: boolean;
}

export class ScrollDebugger {
  private static logStyle = 'color: #ff6b6b; font-weight: bold; font-size: 14px;';
  private static infoStyle = 'color: #4ecdc4; font-weight: normal; font-size: 12px;';
  
  static debugElement(element: Element, name: string): ElementDebugInfo {
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    const info: ElementDebugInfo = {
      tagName: element.tagName,
      id: element.id || 'no-id',
      className: element.className || 'no-class',
      height: rect.height,
      scrollHeight: element.scrollHeight || 0,
      clientHeight: element.clientHeight || 0,
      offsetHeight: (element as HTMLElement).offsetHeight || 0,
      overflow: computedStyle.overflow,
      overflowY: computedStyle.overflowY,
      overflowX: computedStyle.overflowX,
      position: computedStyle.position,
      zIndex: computedStyle.zIndex,
      display: computedStyle.display,
      flex: computedStyle.flex,
      flexDirection: computedStyle.flexDirection,
      flexGrow: computedStyle.flexGrow,
      flexShrink: computedStyle.flexShrink,
      flexBasis: computedStyle.flexBasis,
      minHeight: computedStyle.minHeight,
      maxHeight: computedStyle.maxHeight,
      width: rect.width,
      scrollWidth: element.scrollWidth || 0,
      clientWidth: element.clientWidth || 0,
      offsetWidth: (element as HTMLElement).offsetWidth || 0,
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      transform: computedStyle.transform,
      visibility: computedStyle.visibility,
      opacity: computedStyle.opacity,
      pointerEvents: computedStyle.pointerEvents,
    };
    
    console.group(`%c🔍 DEBUG: ${name}`, this.logStyle);
    console.log(`%cElement: ${info.tagName}#${info.id}.${info.className}`, this.infoStyle);
    console.log(`%cDimensions:`, this.infoStyle, {
      height: info.height,
      width: info.width,
      scrollHeight: info.scrollHeight,
      scrollWidth: info.scrollWidth,
      clientHeight: info.clientHeight,
      clientWidth: info.clientWidth,
      offsetHeight: info.offsetHeight,
      offsetWidth: info.offsetWidth
    });
    console.log(`%cPosition:`, this.infoStyle, {
      top: info.top,
      left: info.left,
      bottom: info.bottom,
      right: info.right,
      position: info.position,
      transform: info.transform,
      zIndex: info.zIndex
    });
    console.log(`%cOverflow:`, this.infoStyle, {
      overflow: info.overflow,
      overflowY: info.overflowY,
      overflowX: info.overflowX
    });
    console.log(`%cFlex Layout:`, this.infoStyle, {
      display: info.display,
      flex: info.flex,
      flexDirection: info.flexDirection,
      flexGrow: info.flexGrow,
      flexShrink: info.flexShrink,
      flexBasis: info.flexBasis
    });
    console.log(`%cSize Constraints:`, this.infoStyle, {
      minHeight: info.minHeight,
      maxHeight: info.maxHeight
    });
    console.log(`%cVisibility:`, this.infoStyle, {
      visibility: info.visibility,
      opacity: info.opacity,
      pointerEvents: info.pointerEvents
    });
    console.groupEnd();
    
    return info;
  }
  
  static debugScrollChain(): void {
    console.group(`%c🚀 SCROLL DEBUG CHAIN`, this.logStyle);
    
    // Debug document and body
    console.log(`%cDocument scrollHeight: ${document.documentElement.scrollHeight}`, this.infoStyle);
    console.log(`%cWindow innerHeight: ${window.innerHeight}`, this.infoStyle);
    console.log(`%cBody scrollHeight: ${document.body.scrollHeight}`, this.infoStyle);
    
    this.debugElement(document.documentElement, 'HTML');
    this.debugElement(document.body, 'BODY');
    
    // Debug #app if exists
    const app = document.getElementById('app');
    if (app) {
      this.debugElement(app, 'APP_ROOT');
    }
    
    // Debug main layout containers
    const mainElement = document.querySelector('main');
    if (mainElement) {
      this.debugElement(mainElement, 'MAIN_ELEMENT');
    }
    
    // Debug containers with specific classes/styles that might limit height
    const containers = document.querySelectorAll('[style*="height"], [style*="overflow"], .container');
    containers.forEach((container, index) => {
      this.debugElement(container, `CONTAINER_${index}`);
    });
    
    console.groupEnd();
  }
  
  static checkScrollability(): boolean {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const isScrollable = documentHeight > windowHeight;
    
    console.log(`%c📏 SCROLLABILITY CHECK`, this.logStyle);
    console.log(`%cDocument height: ${documentHeight}px`, this.infoStyle);
    console.log(`%cWindow height: ${windowHeight}px`, this.infoStyle);
    console.log(`%cIs scrollable: ${isScrollable}`, isScrollable ? 'color: green' : 'color: red');
    
    return isScrollable;
  }
  
  static findScrollBlockers(): ScrollBlockerAnalysis[] {
    const blockers: ScrollBlockerAnalysis[] = [];
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const reasons: string[] = [];
      const fixes: string[] = [];
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
      
      // Check for fixed viewport height
      if (computedStyle.height.includes('100vh') || computedStyle.maxHeight.includes('100vh')) {
        reasons.push('Uses 100vh height constraint');
        fixes.push('Consider using min-height: 100vh instead');
        severity = 'high';
      }
      
      // Check for overflow hidden on potentially scrollable elements
      if (computedStyle.overflow === 'hidden' || computedStyle.overflowY === 'hidden') {
        if (element.scrollHeight > element.clientHeight) {
          reasons.push('Has overflow:hidden but content overflows');
          fixes.push('Change overflow to auto or visible, or add proper height');
          severity = 'critical';
        }
      }
      
      // Check for flex containers that might be constraining height
      if (computedStyle.display.includes('flex')) {
        if (computedStyle.flexShrink === '1' && computedStyle.height === 'auto') {
          const parent = element.parentElement;
          if (parent && window.getComputedStyle(parent).height.includes('vh')) {
            reasons.push('Flex child with flex-shrink:1 under height-constrained parent');
            fixes.push('Set flex: 1 1 auto and overflow: auto on this element');
            severity = 'medium';
          }
        }
      }
      
      // Check for positioned elements that might be blocking scroll
      if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
        if (rect.height >= window.innerHeight * 0.8) {
          reasons.push('Fixed/sticky element takes up most of viewport');
          fixes.push('Reduce height or change position strategy');
          severity = 'high';
        }
      }
      
      // Check for elements with explicit height that might be too small
      if (computedStyle.height !== 'auto' && !computedStyle.height.includes('vh')) {
        const heightPx = parseFloat(computedStyle.height);
        if (heightPx > 0 && element.scrollHeight > heightPx * 1.2) {
          reasons.push('Explicit height smaller than content');
          fixes.push('Remove height constraint or add overflow: auto');
          severity = 'medium';
        }
      }
      
      // Check for transform that might be affecting layout
      if (computedStyle.transform !== 'none') {
        reasons.push('Has CSS transform that might affect scrolling');
        fixes.push('Check if transform is necessary for scroll context');
        severity = 'low';
      }
      
      if (reasons.length > 0) {
        const selector = this.getElementSelector(element);
        blockers.push({
          element,
          selector,
          reasons,
          severity,
          fixes
        });
        
        const severityColors = {
          low: 'color: #feca57',
          medium: 'color: #ff9ff3',
          high: 'color: #ff6b6b',
          critical: 'color: #ee5a24'
        };
        
        console.warn(`%c⚠️ SCROLL BLOCKER [${severity.toUpperCase()}]:`, severityColors[severity] + '; font-weight: bold;', {
          element: selector,
          reasons,
          fixes,
          styles: {
            height: computedStyle.height,
            overflow: computedStyle.overflow,
            overflowY: computedStyle.overflowY,
            position: computedStyle.position,
            display: computedStyle.display,
            flex: computedStyle.flex
          }
        });
      }
    });
    
    return blockers;
  }
  
  static analyzeLayout(): LayoutAnalysis {
    const allElements = document.querySelectorAll('*');
    const analysis: LayoutAnalysis = {
      scrollableAncestors: [],
      fixedPositionElements: [],
      flexContainers: [],
      gridContainers: [],
      overflowHiddenElements: [],
      heightConstrainedElements: [],
      totalPageHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      isPageScrollable: document.documentElement.scrollHeight > window.innerHeight
    };
    
    allElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      
      // Find scrollable ancestors
      if (element.scrollHeight > element.clientHeight && 
          (computedStyle.overflow === 'auto' || computedStyle.overflowY === 'auto' || 
           computedStyle.overflow === 'scroll' || computedStyle.overflowY === 'scroll')) {
        analysis.scrollableAncestors.push(element);
      }
      
      // Find fixed position elements
      if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
        analysis.fixedPositionElements.push(element);
      }
      
      // Find flex containers
      if (computedStyle.display === 'flex' || computedStyle.display === 'inline-flex') {
        analysis.flexContainers.push(element);
      }
      
      // Find grid containers
      if (computedStyle.display === 'grid' || computedStyle.display === 'inline-grid') {
        analysis.gridContainers.push(element);
      }
      
      // Find overflow hidden elements
      if (computedStyle.overflow === 'hidden' || computedStyle.overflowY === 'hidden') {
        analysis.overflowHiddenElements.push(element);
      }
      
      // Find height constrained elements
      if (computedStyle.height !== 'auto' || computedStyle.maxHeight !== 'none') {
        analysis.heightConstrainedElements.push(element);
      }
    });
    
    console.group(`%c📊 LAYOUT ANALYSIS`, this.logStyle);
    console.log(`%cPage scrollability:`, this.infoStyle, {
      totalHeight: analysis.totalPageHeight,
      viewportHeight: analysis.viewportHeight,
      isScrollable: analysis.isPageScrollable,
      scrollableBy: analysis.totalPageHeight - analysis.viewportHeight
    });
    console.log(`%cScrollable ancestors: ${analysis.scrollableAncestors.length}`, this.infoStyle);
    console.log(`%cFixed elements: ${analysis.fixedPositionElements.length}`, this.infoStyle);
    console.log(`%cFlex containers: ${analysis.flexContainers.length}`, this.infoStyle);
    console.log(`%cGrid containers: ${analysis.gridContainers.length}`, this.infoStyle);
    console.log(`%cOverflow hidden: ${analysis.overflowHiddenElements.length}`, this.infoStyle);
    console.log(`%cHeight constrained: ${analysis.heightConstrainedElements.length}`, this.infoStyle);
    console.groupEnd();
    
    return analysis;
  }
  
  static getElementSelector(element: Element): string {
    if (element.id) {
      return `#${element.id}`;
    }
    
    let selector = element.tagName.toLowerCase();
    
    if (element.className) {
      const classes = Array.from(element.classList).slice(0, 3).join('.');
      selector += `.${classes}`;
    }
    
    // Add data attributes if present
    const dataAttrs = Array.from(element.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .slice(0, 2)
      .map(attr => `[${attr.name}="${attr.value}"]`)
      .join('');
    
    selector += dataAttrs;
    
    return selector;
  }
  
  static highlightElement(element: Element, color: string = '#ff6b6b', duration: number = 3000): void {
    const originalOutline = (element as HTMLElement).style.outline;
    const originalBoxShadow = (element as HTMLElement).style.boxShadow;
    
    (element as HTMLElement).style.outline = `3px solid ${color}`;
    (element as HTMLElement).style.boxShadow = `0 0 10px ${color}`;
    
    setTimeout(() => {
      (element as HTMLElement).style.outline = originalOutline;
      (element as HTMLElement).style.boxShadow = originalBoxShadow;
    }, duration);
  }
  
  static findElementsBlockingScroll(): Element[] {
    const blockers: Element[] = [];
    const analysis = this.analyzeLayout();
    
    // Look for elements that might be preventing scroll
    analysis.overflowHiddenElements.forEach(element => {
      if (element.scrollHeight > element.clientHeight) {
        blockers.push(element);
      }
    });
    
    analysis.heightConstrainedElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.height.includes('vh') && element.scrollHeight > element.clientHeight) {
        blockers.push(element);
      }
    });
    
    return blockers;
  }
}
