import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // 只处理根路径
  if (url.pathname === '/') {
    // 获取浏览器语言
    const acceptLanguage = context.request.headers.get('accept-language') || '';
    
    // 检查是否包含中文
    const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh');
    
    // 根据语言偏好重定向
    if (isChinesePreferred) {
      return context.redirect('/zh-cn/', 302);
    } else {
      return context.redirect('/en/', 302);
    }
  }
  
  return next();
});
