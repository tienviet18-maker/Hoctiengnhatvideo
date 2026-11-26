/**
 * Cấu hình web của project Firebase MiraiGo. Đây là cấu hình CÔNG KHAI của trình duyệt
 * (apiKey của Firebase không phải mật khẩu; quyền nằm ở Firestore rules và Authorized domains).
 * Để trống `apiKey` thì app chạy như chưa có đăng nhập ("Đăng nhập sẽ mở sớm").
 * authDomain lấy theo tên miền đang chạy (Worker chuyển tiếp /__/auth về Firebase, giống ViBJT).
 */
export const FIREBASE_WEB_CONFIG = {
  apiKey: "AIzaSyDT24EleszDU9zPBevYVge3QSHhrjLdCO0",
  projectId: "miraigo-vimai",
  appId: "1:819043254514:web:bfe1bcbbb09efb3a98106b",
  messagingSenderId: "819043254514",
  storageBucket: "miraigo-vimai.firebasestorage.app",
};

export const FIREBASE_ENABLED = FIREBASE_WEB_CONFIG.apiKey.length > 0;

/** API VIP web chung của ViMai (vimai-ecosystem docs/WEB_VIP.md). */
export const WEBVIP_API = "https://vimai.jp";
export const WEBVIP_APP = "miraigo";
