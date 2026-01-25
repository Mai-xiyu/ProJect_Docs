import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // 获取 base 路径（来自 astro.config.mjs）
  const base = import.meta.env.BASE_URL || '/';
  
  // 只处理根路径
  if (url.pathname === base || url.pathname === base.replace(/\/$/, '')) {
    // 获取浏览器语言
    const acceptLanguage = context.request.headers.get('accept-language') || '';
    
    // 检查是否包含中文
    const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh');
    
    // 构建正确的重定向路径
    const targetPath = isChinesePreferred ? `${base}zh-cn/` : `${base}en/`;
    
    return context.redirect(targetPath, 302);
  }
  
  return next();
});
