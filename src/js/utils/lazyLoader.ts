export class LazyLoader {
  private static cache = new Map<string, any>();

  static async loadModule<T = any>(
    moduleFactory: () => Promise<any>,
    cacheKey?: string
  ): Promise<T> {
    if (cacheKey && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const module = await moduleFactory();
      const result = module.default || module;
      
      if (cacheKey) {
        this.cache.set(cacheKey, result);
      }
      
      return result;
    } catch (error) {
      console.error(`Failed to load module${cacheKey ? ` (${cacheKey})` : ''}:`, error);
      throw error;
    }
  }

  static preloadModules(moduleFactories: Array<() => Promise<any>>) {
    const promises = moduleFactories.map(factory => {
      return factory().catch(error => {
        console.warn('Failed to preload module:', error);
        return null;
      });
    });

    return Promise.allSettled(promises);
  }

  static loadOnIntersection<T = any>(
    element: Element,
    moduleFactory: () => Promise<any>,
    options?: IntersectionObserverInit
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              observer.disconnect();
              this.loadModule<T>(moduleFactory)
                .then(resolve)
                .catch(reject);
            }
          });
        },
        options
      );

      observer.observe(element);
    });
  }

  static clearCache() {
    this.cache.clear();
  }
}

export default LazyLoader;
