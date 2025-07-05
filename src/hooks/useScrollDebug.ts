import { useEffect } from 'preact/hooks';
import { ScrollDebugger } from '../utils/scrollDebugger';

export function useScrollDebug(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    
    // Debug on mount
    console.clear();
    console.log('%c🔧 SCROLL DEBUG INITIALIZED', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
    
    ScrollDebugger.checkScrollability();
    ScrollDebugger.debugScrollChain();
    
    const blockers = ScrollDebugger.findScrollBlockers();
    ScrollDebugger.analyzeLayout();
    
    if (blockers.length > 0) {
      console.warn(`%c🚨 FOUND ${blockers.length} POTENTIAL SCROLL BLOCKERS`, 'color: #ee5a24; font-size: 14px; font-weight: bold;');
    } else {
      console.log('%c✅ No obvious scroll blockers detected', 'color: #26de81; font-weight: bold;');
    }
    
    // Debug on resize
    const handleResize = () => {
      console.log('%c📐 WINDOW RESIZED - Re-debugging...', 'color: #4ecdc4; font-weight: bold;');
      ScrollDebugger.checkScrollability();
      ScrollDebugger.analyzeLayout();
    };
    
    // Debug on scroll attempt
    const handleScroll = () => {
      console.log('%c📜 SCROLL EVENT DETECTED', 'color: #45b7d1; font-weight: bold;', {
        scrollY: window.scrollY,
        scrollTop: document.documentElement.scrollTop,
        maxScroll: document.documentElement.scrollHeight - window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Enhanced debug info on window for manual inspection
    (window as any).scrollDebug = {
      // Basic debugging
      check: () => ScrollDebugger.checkScrollability(),
      debug: () => ScrollDebugger.debugScrollChain(),
      
      // Advanced analysis
      blockers: () => {
        const result = ScrollDebugger.findScrollBlockers();
        console.table(result.map(b => ({
          selector: b.selector,
          severity: b.severity,
          reasons: b.reasons.join(', '),
          fixes: b.fixes.join(', ')
        })));
        return result;
      },
      
      analyze: () => ScrollDebugger.analyzeLayout(),
      
      // Interactive debugging
      highlight: (selector: string, color?: string) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => ScrollDebugger.highlightElement(el, color));
        console.log(`%cHighlighted ${elements.length} elements matching: ${selector}`, 'color: #feca57');
      },
      
      inspect: (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
          ScrollDebugger.debugElement(element, `MANUAL_INSPECT_${selector}`);
          ScrollDebugger.highlightElement(element, '#45b7d1');
        } else {
          console.warn(`Element not found: ${selector}`);
        }
      },
      
      fixScrolling: () => {
        console.group('%c🔧 ATTEMPTING AUTO-FIX', 'color: #ff6b6b; font-weight: bold;');
        
        const blockers = ScrollDebugger.findScrollBlockers();
        let fixCount = 0;
        
        blockers.forEach(blocker => {
          if (blocker.severity === 'critical' || blocker.severity === 'high') {
            const element = blocker.element as HTMLElement;
            const computedStyle = window.getComputedStyle(element);
            
            // Attempt to fix overflow hidden issues
            if ((computedStyle.overflow === 'hidden' || computedStyle.overflowY === 'hidden') 
                && element.scrollHeight > element.clientHeight) {
              element.style.overflowY = 'auto';
              console.log(`%cFixed overflow on: ${blocker.selector}`, 'color: #26de81');
              fixCount++;
            }
            
            // Attempt to fix 100vh height issues
            if (computedStyle.height === '100vh' || computedStyle.maxHeight === '100vh') {
              element.style.minHeight = '100vh';
              element.style.height = 'auto';
              element.style.maxHeight = 'none';
              console.log(`%cFixed height constraint on: ${blocker.selector}`, 'color: #26de81');
              fixCount++;
            }
          }
        });
        
        console.log(`%cAttempted ${fixCount} automatic fixes`, fixCount > 0 ? 'color: #26de81' : 'color: #feca57');
        console.groupEnd();
        
        // Re-analyze after fixes
        setTimeout(() => {
          console.log('%c🔄 Re-analyzing after fixes...', 'color: #4ecdc4');
          ScrollDebugger.findScrollBlockers();
        }, 100);
      },
      
      info: () => {
        console.group('%c💡 Available Debug Commands', 'color: #96ceb4; font-weight: bold;');
        console.log('%cBasic:', 'color: #4ecdc4; font-weight: bold;');
        console.log('  scrollDebug.check() - Check if page is scrollable');
        console.log('  scrollDebug.debug() - Debug all layout elements');
        console.log('  scrollDebug.analyze() - Comprehensive layout analysis');
        console.log('');
        console.log('%cAdvanced:', 'color: #4ecdc4; font-weight: bold;');
        console.log('  scrollDebug.blockers() - Find and analyze scroll blockers');
        console.log('  scrollDebug.highlight("selector") - Highlight elements');
        console.log('  scrollDebug.inspect("selector") - Inspect specific element');
        console.log('  scrollDebug.fixScrolling() - Attempt automatic fixes');
        console.log('');
        console.log('%cExample usage:', 'color: #feca57; font-style: italic;');
        console.log('  scrollDebug.inspect("#app")');
        console.log('  scrollDebug.highlight(".container", "#ff6b6b")');
        console.groupEnd();
      }
    };
    
    console.log('%c💡 Enhanced debug commands available on window.scrollDebug', 'color: #96ceb4; font-style: italic;');
    console.log('Type scrollDebug.info() for all available commands');
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);
}

// Enhanced debug hook for specific components
export function useComponentScrollDebug(componentName: string, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    
    console.log(`%c🎯 COMPONENT DEBUG: ${componentName}`, 'color: #feca57; font-weight: bold;');
    
    // Debug this component's container on next tick
    setTimeout(() => {
      const container = document.querySelector(`[data-component="${componentName}"]`);
      if (container) {
        ScrollDebugger.debugElement(container, `COMPONENT_${componentName}`);
      }
    }, 100);
  }, [componentName, enabled]);
}
