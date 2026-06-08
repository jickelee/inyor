import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  Building2,
  Calculator,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  FileText,
  Gift,
  Globe2,
  Headphones,
  Home,
  Info,
  Landmark,
  ListChecks,
  Loader2,
  LockKeyhole,
  LogOut,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Star,
  Ticket,
  Trash2,
  User,
  WalletCards,
  Wifi,
  X,
} from 'lucide-react';
import './styles.css';

const palette = {
  emerald: '#0A5C4A',
  emerald2: '#0F7A63',
  teal: '#0A8F8A',
  gold: '#C99A2E',
  ink: '#10201B',
  muted: '#65746F',
  bg: '#F6F8F7',
  line: '#DCE5E1',
  danger: '#B42318',
};

const money = '50,000';
const pkLicense = 'Licensed by SECP | Powered by Inyor Finance Services (Private) Limited | License No. SECP/LRD/78/JDFL/2026-08';
const walletLogos = {
  easypaisa: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Easypaisa_Digital_Bank_logo.png',
  jazzcash: 'https://upload.wikimedia.org/wikipedia/commons/4/41/JazzCash_logo_%282025%29.png',
};

const configurableBanners = [
  {
    id: 'security',
    title_en: 'Keep your account secure',
    body_en: 'Never share your OTP or unlock pattern with anyone.',
    title_ur: 'اپنا اکاؤنٹ محفوظ رکھیں',
    body_ur: 'اپنا OTP یا ان لاک پیٹرن کسی سے شیئر نہ کریں۔',
    tone: 'secure',
    icon: ShieldCheck,
  },
  {
    id: 'repay',
    title_en: 'Repay on time',
    body_en: 'Timely repayment helps avoid extra charges.',
    title_ur: 'وقت پر ادائیگی کریں',
    body_ur: 'وقت پر ادائیگی اضافی چارجز سے بچاتی ہے۔',
    tone: 'gold',
    icon: Landmark,
  },
  {
    id: 'urdu',
    title_en: 'Urdu support available',
    body_en: 'Switch language anytime from the top bar.',
    title_ur: 'اردو سپورٹ دستیاب ہے',
    body_ur: 'اوپر موجود بٹن سے زبان کبھی بھی بدلیں۔',
    tone: 'teal',
    icon: Globe2,
  },
];

const u = {
  back: 'واپس',
  continue: 'جاری رکھیں',
  apply: 'درخواست دیں',
  home: 'ہوم',
  repay: 'ادائیگی',
  profile: 'پروفائل',
  welcome: 'Inyor میں خوش آمدید',
  mobile: 'موبائل نمبر',
  otpTitle: 'OTP تصدیق',
  otpHead: 'تصدیقی کوڈ درج کریں',
  patternTitle: 'ایپ لاک سیٹ کریں',
  calculator: 'قرض کیلکولیٹر',
  application: 'قرض کی درخواست',
  settings: 'ترتیبات',
  reset: 'پاس ورڈ ری سیٹ',
  deletion: 'اکاؤنٹ حذف کریں',
  devices: 'ڈیوائس مینیجر',
  coupons: 'کوپن',
  faq: 'سوالات',
  about: 'ہمارے بارے میں',
};

function StatusBar() {
  return (
    <div className="status-bar">
      <strong>12:00</strong>
      <div className="status-icons">
        <span className="signal" />
        <Wifi size={15} strokeWidth={2.5} />
        <span className="battery" />
      </div>
    </div>
  );
}

function PhoneFrame({ title, children, rtl = false, tab = 'home', className = '', noNav = false, showBack = true, rightSlot = null, onBack }) {
  return (
    <section className={`phone ${className}`} dir={rtl ? 'rtl' : 'ltr'}>
      <StatusBar />
      {title && (
        <div className="topbar">
          {showBack ? (
            <button className="icon-btn" aria-label={rtl ? u.back : 'Back'} onClick={onBack}>
              <ArrowLeft size={21} />
            </button>
          ) : <span className="topbar-spacer" />}
          <span>{title}</span>
          {rightSlot || <span className="topbar-spacer" />}
        </div>
      )}
      <main className="screen">{children}</main>
      {!noNav && <BottomNav active={tab} rtl={rtl} />}
    </section>
  );
}

function BottomNav({ active, rtl = false }) {
  const items = [
    ['home', Home, rtl ? u.home : 'Home'],
    ['repay', FileText, rtl ? u.repay : 'Repay'],
    ['profile', User, rtl ? u.profile : 'Profile'],
  ];
  return (
    <nav className="bottom-nav">
      {items.map(([key, Icon, label]) => (
        <button key={key} className={active === key ? 'active' : ''}>
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function BrandHeader({ rtl = false }) {
  return (
    <div className="brand-header">
      <div className="brand-mark">I</div>
      <strong>Inyor</strong>
      <div className="brand-actions">
        <Bell size={20} />
        <Headphones size={21} />
        <button className="language">
          <Globe2 size={16} />
          {rtl ? 'En' : 'اردو'}
        </button>
      </div>
    </div>
  );
}

function Button({ children, variant = 'primary', icon: Icon, wide = true, className = '', ...props }) {
  return (
    <button className={`btn ${variant} ${wide ? 'wide' : ''} ${className}`.trim()} {...props}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}

function BannerCarousel({ rtl = false, placement = 'home' }) {
  const items = placement === 'account' ? configurableBanners.slice(0, 2) : configurableBanners;
  return (
    <section className="icon-carousel" aria-label={rtl ? 'تشہیری جگہ' : 'Configurable banner'}>
      <div className="icon-carousel-track" dir={rtl ? 'rtl' : 'ltr'}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <article className={`icon-slide ${item.tone} ${i === 0 ? 'active' : ''}`} key={item.id}>
              <div className="slide-icon"><Icon /></div>
              <div>
                <span>{rtl ? 'اعلان' : 'Notice'}</span>
                <h3>{rtl ? item.title_ur : item.title_en}</h3>
                <p>{rtl ? item.body_ur : item.body_en}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="banner-dots">
        {items.map((item, i) => <i key={item.id} className={i === 0 ? 'active' : ''} />)}
      </div>
    </section>
  );
}

function AccountNoticeCarousel({ rtl = false }) {
  return <BannerCarousel rtl={rtl} placement="account" />;
}

function Field({ label, value, icon: Icon, hint, error, rtl = false }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <span>{label}</span>
      <div>
        {Icon && <Icon size={19} />}
        <input defaultValue={value} placeholder={hint} />
      </div>
      {error && <small>{error}</small>}
    </label>
  );
}

function TrustFooter() {
  return (
    <div className="trust-footer">
      <ShieldCheck size={16} />
      <span>{pkLicense}</span>
    </div>
  );
}

function LocalTrustFooter({ rtl = false }) {
  return (
    <div className="trust-footer">
      <ShieldCheck size={16} />
      <span>{pkLicense}</span>
    </div>
  );
}

function Splash({ rtl = false }) {
  return (
    <PhoneFrame noNav className="splash-phone" rtl={false}>
      <div className="splash">
        <div className="logo-orb">I</div>
        <h1>Inyor</h1>
        <p>Secure digital credit for everyday needs</p>
        <div className="splash-loader"><span /></div>
      </div>
    </PhoneFrame>
  );
}

function RiskNotice({ rtl = false }) {
  return (
    <PhoneFrame rtl={false} noNav>
      <button className="countdown-pill">Skip · 3s</button>
      <div className="risk-logo">
        <div className="brand-mark">I</div>
        <span>Inyor<br />Easy Cash Loans</span>
      </div>
      <div className="risk-original risk-bilingual">
        <p dir="ltr">“Digital Nano loans are short-term loans with high-interest rates and additional charges. It is essential to that you understand potential risk of over-indebtedness. Borrow responsibly and only take loans that you can comfortably repay within the agreed timeframe to avoid financial difficulties. Always read the terms and conditions carefully before availing any loan. Your financial well-being is our priority.”</p>
        <p className="urdu" dir="rtl">
          قرض لیتے وقت ہمیشہ ذمہ داری کا مظاہرہ کریں اور صرف اتنا ہی قرض حاصل کریں جو آپ، کسی مالی مشکل کا شکار ہوئے بغیر، آسانی کے ساتھ مقررہ مدت کے اندر اندر ادا کر سکتے ہیں۔ قرض لینے سے پہلے ہمیشہ دیئے گئے شرائط و ضوابط کو غور سے پڑھیں اور سمجھیں۔
        </p>
      </div>
      <LocalTrustFooter rtl={false} />
    </PhoneFrame>
  );
}

function LegalLinks({ rtl = false }) {
  const rows = rtl
    ? ['پرائیویسی پالیسی', 'شرائط و ضوابط', 'صارف ڈیٹا پالیسی']
    : ['Privacy Policy', 'Terms and Conditions', 'User Data Policy'];
  return (
    <div className="legal-links" dir={rtl ? 'rtl' : 'ltr'}>
      {rows.map((row) => <button key={row}>{row}<ChevronRight size={16} /></button>)}
    </div>
  );
}

function PermissionConsent({ rtl = false }) {
  const permissions = rtl ? [
    {
      title: 'فون',
      icon: Phone,
      body: 'ہم کال اسٹیٹس اور موبائل نیٹ ورک کی معلومات استعمال کرتے ہیں تاکہ آپ کے اکاؤنٹ کو آپ کے ڈیوائس سے محفوظ طریقے سے منسلک کیا جا سکے۔',
    },
    {
      title: 'کیمرہ',
      icon: Camera,
      body: 'ہم چہرے کی شناخت اور دستاویزات کی تصدیق کے لیے آپ کے کیمرہ تک رسائی کی درخواست کرتے ہیں۔ آپ کسی بھی وقت یہ اجازت بند کر سکتے ہیں۔',
    },
    {
      title: 'مقام',
      icon: MapPin,
      body: 'آپ کو مقام پر مبنی خدمات فراہم کرنے کے لیے ہمیں آپ کے ڈیوائس کے مقام تک رسائی درکار ہے۔ اس سے ہمیں مقام پر مبنی سفارشات، میپنگ سروسز، اور قریبی تلاش جیسی خصوصیات فراہم کرنے میں مدد ملتی ہے۔ ہم یقین دلاتے ہیں کہ آپ کا مقام صرف مخصوص مقاصد کے لیے استعمال کیا جائے گا اور آپ کی رضامندی کے بغیر کسی تیسرے فریق کے ساتھ شیئر نہیں کیا جائے گا۔ آپ کی رازداری اور سیکیورٹی ہمارے لیے نہایت اہم ہے۔',
    },
    {
      title: 'اطلاعات',
      icon: Bell,
      body: 'اطلاعات کی اجازت دیں:',
      bullets: ['اہم اپ ڈیٹس وصول کریں', 'قرض کی صورتحال کی اطلاعات حاصل کریں', 'متعلقہ سروس پیغامات وصول کریں'],
      foot: 'آپ کسی بھی وقت سیٹنگز میں اپنی ترجیحات تبدیل کر سکتے ہیں۔',
    },
  ] : [
    {
      title: 'Phone',
      icon: Phone,
      body: 'We use call status and mobile network information to securely link your account to your device.',
    },
    {
      title: 'Camera',
      icon: Camera,
      body: 'We request access to your camera for facial recognition and document verification.You can disable this permission at any time.',
    },
    {
      title: 'Location',
      icon: MapPin,
      body: "To provide you with location-based services, we need access to your device's location. This allows us to offer features such as location-based recommendations, mapping services, and nearby search functionalities. We assure you that your location data will only be used for the specified purposes and will not be shared with any third parties without your consent. Your privacy and security are of utmost importance to us.",
    },
    {
      title: 'Notification',
      icon: Bell,
      body: 'Allow notifications to:',
      bullets: ['Receive important updates', 'Get loan status notifications', 'Receive relevant service messages'],
      foot: 'You can manage your preferences anytime in settings.',
    },
  ];
  return (
    <PhoneFrame title={rtl ? 'اجازتیں' : 'Permission'} rtl={rtl} noNav showBack={false}>
      <button className="language permission-language" dir={rtl ? 'rtl' : 'ltr'}>
        <Globe2 size={16} />
        <span>{rtl ? 'En' : 'اردو'}</span>
      </button>
      <div className="permission-card" dir={rtl ? 'rtl' : 'ltr'}>
        <ShieldCheck />
        <div>
          <h2>{rtl ? 'پاکستان ڈیٹا کے تحفظ کی ضمانت دیتا ہے۔' : 'Pakistan Guarantees Data Protection.'}</h2>
          <p>{rtl ? 'اپنی خدمات فراہم کرنے اور آپ کی قرض درخواست پر کارروائی کے لیے ہمیں آپ کا ذاتی ڈیٹا جمع، پراسیس اور محفوظ کرنے کی رضامندی درکار ہے۔' : 'To provide our services and process your loan application, we require your consent to collect, process, and store your personal data.'}</p>
          <p>{rtl ? 'مزید تفصیلات کے لیے براہ کرم ہماری پرائیویسی پالیسی دیکھیں۔' : 'Please review our Privacy Policy for more details.'}</p>
        </div>
      </div>
      <div className="permission-list" dir={rtl ? 'rtl' : 'ltr'}>
        {permissions.map((item) => {
          const Icon = item.icon;
          return (
            <div className="permission-item" key={item.title}>
              <Icon />
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                {item.bullets && (
                  <ul>
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {item.foot && <p>{item.foot}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <label className="check-row" dir={rtl ? 'rtl' : 'ltr'}>
        <input type="checkbox" defaultChecked />
        <span>{rtl ? (
          <>
            میں نے <button className="inline-policy">پرائیویسی پالیسی</button>، <button className="inline-policy">شرائط و ضوابط</button>، اور <button className="inline-policy">صارف ڈیٹا پالیسی</button> پڑھ لی ہے اور قبول کرتا/کرتی ہوں۔
          </>
        ) : (
          <>
            I have read and accepted <button className="inline-policy">Privacy Policy</button>, <button className="inline-policy">Terms and Conditions</button>, <button className="inline-policy">User Data Policy</button>.
          </>
        )}</span>
      </label>
      <div className="permission-actions">
        <Button>{rtl ? 'میں سمجھ گیا/گئی اور متفق ہوں' : 'I understand and agree'}</Button>
        <Button variant="outline">{rtl ? 'متفق نہیں' : 'Disagree'}</Button>
      </div>
    </PhoneFrame>
  );
}

function Login({ rtl = false, error = false }) {
  return (
    <PhoneFrame noNav rtl={rtl}>
      <div className="auth-head">
        <div className="logo-orb small">I</div>
        <h1>{rtl ? u.welcome : 'Welcome to Inyor'}</h1>
        <p>{rtl ? 'موبائل نمبر سے جاری رکھیں' : 'Continue with your mobile wallet number'}</p>
      </div>
      <Field rtl={rtl} label={rtl ? u.mobile : 'Mobile number'} value="03" hint="03xxxxxxxxx" icon={Smartphone} error={error ? (rtl ? 'درست پاکستانی موبائل نمبر درج کریں۔' : 'Enter a valid Pakistani mobile number.') : ''} />
      <div className="auth-actions">
        <Button variant={error ? 'disabled' : 'primary'}>{rtl ? u.continue : 'Continue'}</Button>
        <Button variant="outline" icon={MessageCircle}>{rtl ? 'WhatsApp سے جاری رکھیں' : 'Continue with WhatsApp'}</Button>
      </div>
      <div className="legal-line">{rtl ? 'پرائیویسی پالیسی · شرائط و ضوابط · صارف ڈیٹا پالیسی' : 'Privacy Policy · Terms and Conditions · User Data Policy'}</div>
      <div className="security-strip">
        <ShieldCheck size={18} />
        <span>{rtl ? 'قرض صرف تصدیق شدہ JazzCash یا Easypaisa اکاؤنٹ میں منتقل کیا جاتا ہے۔' : 'Loans are disbursed only to verified JazzCash or Easypaisa accounts.'}</span>
      </div>
      <LocalTrustFooter rtl={rtl} />
    </PhoneFrame>
  );
}

function Otp({ rtl = false, error = false, loading = false, channel = 'sms' }) {
  const isWhatsapp = channel === 'whatsapp';
  return (
    <PhoneFrame title={isWhatsapp ? (rtl ? 'WhatsApp OTP تصدیق' : 'WhatsApp OTP Verification') : (rtl ? u.otpTitle : 'OTP Verification')} rtl={rtl} noNav>
      <h2 className="page-title">{rtl ? u.otpHead : 'Enter verification code'}</h2>
      <p className="subtle">
        {isWhatsapp
          ? (rtl ? <>ہم نے <span className="ltr-token">+92 0312 345 678</span> پر WhatsApp کوڈ بھیجا ہے۔</> : <>We sent a WhatsApp code to <span className="ltr-token">+92 0312 345 678</span>.</>)
          : (rtl ? <>ہم نے <span className="ltr-token">+92 0312 345 678</span> پر SMS کوڈ بھیجا ہے۔</> : <>We sent a sms code to <span className="ltr-token">+92 0312 345 678</span>.</>)}
      </p>
      <div className={`otp-box ${error ? 'error' : ''}`}>
        {['4', '3', '5', '6', '6', '7'].map((n, i) => <span key={i}>{n}</span>)}
      </div>
      {error && <p className="error-text">{rtl ? 'OTP درست نہیں۔ کوڈ چیک کریں یا نیا کوڈ لیں۔' : 'Incorrect OTP. Please check the code or request a new one.'}</p>}
      <Button variant={loading ? 'disabled' : 'primary'} icon={loading ? Loader2 : undefined}>{loading ? (rtl ? 'تصدیق ہو رہی ہے...' : 'Verifying...') : (rtl ? u.continue : 'Continue')}</Button>
      <div className="resend-row otp-resend-actions">
        <span>{rtl ? 'کوڈ موصول نہیں ہوا؟' : "Didn't receive the code?"}</span>
        <button>{isWhatsapp ? (rtl ? 'WhatsApp سے دوبارہ بھیجیں' : 'Resend WhatsApp') : (rtl ? 'SMS دوبارہ بھیجیں' : 'Resend SMS')}</button>
        <button>{isWhatsapp ? (rtl ? 'SMS سے بھیجیں' : 'Send via SMS') : (rtl ? 'WhatsApp سے بھیجیں' : 'Send via WhatsApp')}</button>
      </div>
      <div className="notice-box">
        <Info size={18} />
        <p>{rtl ? 'اپنا OTP کسی سے شیئر نہ کریں۔ Inyor کبھی آپ سے کوڈ نہیں مانگے گا۔' : 'Never share your OTP. Inyor will never ask for your verification code.'}</p>
      </div>
      <LocalTrustFooter rtl={rtl} />
    </PhoneFrame>
  );
}

function SmsOnlyOtp({ rtl = false, flow = 'reset' }) {
  const title = flow === 'delete'
    ? (rtl ? 'اکاؤنٹ حذف کرنے کی تصدیق' : 'Account deletion verification')
    : (rtl ? 'پاس ورڈ ری سیٹ تصدیق' : 'Reset password verification');
  return (
    <PhoneFrame title={title} rtl={rtl} noNav>
      <h2 className="page-title">{rtl ? 'SMS کوڈ درج کریں' : 'Enter SMS code'}</h2>
      <p className="subtle">{rtl ? 'ہم نے رجسٹرڈ موبائل نمبر پر 6 ہندسوں کا کوڈ بھیجا ہے۔' : 'We sent a 6-digit code to the registered mobile number.'}</p>
      <div className="otp-box">
        {['4', '3', '5', '6', '6', '7'].map((n, i) => <span key={i}>{n}</span>)}
      </div>
      <Button>{rtl ? 'تصدیق کریں' : 'Verify'}</Button>
      <div className="resend-row otp-resend-actions sms-only">
        <span>{rtl ? 'SMS موصول نہیں ہوا؟' : "Didn't receive SMS?"}</span>
        <button>{rtl ? 'دوبارہ بھیجیں' : 'Resend'}</button>
      </div>
      <div className="notice-box">
        <Info size={18} />
        <p>{rtl ? 'یہ مرحلہ صرف SMS تصدیق کو سپورٹ کرتا ہے۔' : 'This step supports SMS verification only.'}</p>
      </div>
    </PhoneFrame>
  );
}

function PatternVerify({ rtl = false, error = false }) {
  return (
    <PhoneFrame rtl={rtl} noNav>
      <div className="pin-card">
        <div className="pin-icon"><LockKeyhole /></div>
        <h2>{rtl ? 'ان لاک پیٹرن بنائیں' : 'Draw unlock pattern'}</h2>
        <p>{rtl ? 'اپنے اکاؤنٹ میں داخل ہونے کے لیے محفوظ ان لاک پیٹرن بنائیں۔' : 'Draw your saved unlock pattern to access your account.'}</p>
        <div className={`pattern-grid compact ${error ? 'shake' : ''}`}>
          {Array.from({ length: 9 }).map((_, i) => <span key={i} className={i < 4 && !error ? 'selected' : ''} />)}
        </div>
        {error && (
          <div className="pin-error">
            <AlertTriangle />
            <strong>{rtl ? 'ان لاک پیٹرن درست نہیں' : 'Incorrect unlock pattern'}</strong>
            <p>{rtl ? 'براہ کرم دوبارہ کوشش کریں یا ان لاک پیٹرن ری سیٹ کریں۔' : 'Please try again or reset your unlock pattern.'}</p>
          </div>
        )}
        <Button>{rtl ? 'جاری رکھیں' : 'Continue'}</Button>
        <button className="text-link">{rtl ? 'ان لاک پیٹرن ری سیٹ کریں' : 'Reset unlock pattern'}</button>
      </div>
    </PhoneFrame>
  );
}

function Pattern({ rtl = false, confirm = false, error = false }) {
  return (
    <PhoneFrame rtl={rtl} noNav>
      <div className="pattern-head">
        <LockKeyhole />
        <h2>{rtl ? (confirm ? 'ان لاک پیٹرن کی تصدیق کریں' : 'ان لاک پیٹرن بنائیں') : (confirm ? 'Confirm unlock pattern' : 'Create unlock pattern')}</h2>
        <p>{rtl ? (error ? 'پیٹرن میچ نہیں ہوا۔ دوبارہ کوشش کریں۔' : 'اکاؤنٹ کی حفاظت کے لیے کم از کم 4 نقطے استعمال کریں۔') : (error ? 'Pattern does not match. Try again.' : 'Use at least 4 dots to protect your account.')}</p>
      </div>
      <div className={`pattern-grid ${error ? 'shake' : ''}`}>
        {Array.from({ length: 9 }).map((_, i) => <span key={i} className={i < 4 && !error ? 'selected' : ''} />)}
      </div>
      {error && <Button variant="secondary">{rtl ? 'دوبارہ بنائیں' : 'Draw Again'}</Button>}
    </PhoneFrame>
  );
}

function HomePage({ rtl = false, state = 'ready' }) {
  const copy = {
    ready: {
      title: rtl ? 'زیادہ سے زیادہ قرض رقم' : 'Maximum Loan Amount',
      amount: '50,000',
      subtitle: rtl ? '90 دن تک ادائیگی' : 'Up to 90 days repayment',
      cta: rtl ? 'جاری رکھیں' : 'Continue',
    },
    review: {
      title: rtl ? 'آپ کی درخواست زیر جائزہ ہے' : 'Your application is under review',
      cta: rtl ? 'تفصیلات دیکھیں' : 'View Details',
    },
    rejectedRetry: {
      title: rtl ? 'آپ کی درخواست ابھی ہماری شرائط پر پوری نہیں اترتی۔ آپ 29 May 2026 کو دوبارہ درخواست دے سکتے ہیں۔' : 'We’re sorry, your application does not currently meet our loan requirements. You may reapply on 29 May 2026.',
    },
    rejectedFinal: {
      title: rtl ? 'معذرت، آپ اس وقت ہماری قرض شرائط پر پورا نہیں اترتے۔' : 'We’re sorry, you do not meet our loan requirements at this time.',
    },
    choose: {
      title: rtl ? 'قرض کی رقم' : 'Loan Amount',
      cta: rtl ? 'رقم حاصل کریں' : 'Get Funds',
    },
    remaining: {
      title: rtl ? '15 دن باقی ہیں' : '15 days remaining',
      cta: rtl ? 'بل دیکھیں' : 'View Bill',
    },
    dueSoon: {
      title: rtl ? 'ادائیگی جلد واجب الادا ہے' : 'Repayment due soon',
      cta: rtl ? 'بل دیکھیں' : 'View Bill',
    },
    overdue: {
      title: rtl ? 'آپ کی ادائیگی تاخیر کا شکار ہے' : 'Your repayment is overdue',
      cta: rtl ? 'مدد چاہیے؟' : 'Need Help?',
    },
    multipleOverdue: {
      title: rtl ? 'آپ کے متعدد بل تاخیر کا شکار ہیں' : 'Multiple bills are overdue',
      cta: rtl ? 'بل دیکھیں' : 'View Bills',
    },
    coolingCancelBlocked: {
      title: rtl ? 'عارضی طور پر قرض دستیاب نہیں' : 'Borrowing temporarily unavailable',
      cta: rtl ? 'تفصیلات دیکھیں' : 'View Details',
    },
    creditReview: {
      title: rtl ? 'کریڈٹ جائزہ جاری ہے' : 'Credit review in progress',
      cta: rtl ? 'تفصیلات دیکھیں' : 'View Details',
    },
  }[state] || {};

  return (
    <PhoneFrame tab="home" rtl={rtl}>
      <BrandHeader rtl={rtl} />
      {state === 'ready' && (
        <section className="loan-hero home-loan-card">
          <div className="hero-top">
            <span>{copy.title}</span>
            <strong><small>PKR</small>{copy.amount}</strong>
            <p>{copy.subtitle}</p>
          </div>
          <div className="hero-benefits">
            <span><ShieldCheck /> {rtl ? 'محفوظ' : 'Safe & reliable'}</span>
            <span><Landmark /> {rtl ? 'لائسنس یافتہ' : 'NBFC licensed'}</span>
            <span><WalletCards /> {rtl ? 'واضح فیس' : 'No hidden fees'}</span>
          </div>
          <Button>{copy.cta}</Button>
        </section>
      )}
      {state === 'review' && (
        <section className="home-state-card review">
          <div className="home-state-icon"><Loader2 /></div>
          <h2>{copy.title}</h2>
          <div className="home-detail-list">
            <div><span>{rtl ? 'قرض کی رقم' : 'Loan Amount'}</span><strong>PKR 30,000</strong></div>
            <div><span>{rtl ? 'درخواست کی تاریخ' : 'Application Date'}</span><strong>21 Mar 2026</strong></div>
            <div><span>{rtl ? 'حالت' : 'Status'}</span><strong>{rtl ? 'زیر جائزہ' : 'Reviewing'}</strong></div>
          </div>
          <p>{rtl ? 'ہم آپ کی درخواست کا جائزہ لے رہے ہیں۔ براہ کرم اپنا فون دستیاب رکھیں۔' : 'We are reviewing your application. Please keep your phone available.'}</p>
          <Button>{copy.cta}</Button>
        </section>
      )}
      {state === 'creditReview' && (
        <section className="home-state-card creditReview">
          <div className="home-state-icon"><Loader2 /></div>
          <h2>{copy.title}</h2>
          <div className="home-detail-list">
            <div><span>{rtl ? 'جمع کرانے کا وقت' : 'Submitted At'}</span><strong>23 May 2026 10:30</strong></div>
            <div><span>{rtl ? 'متوقع نتیجہ' : 'Estimated Result'}</span><strong>{rtl ? '24 گھنٹے کے اندر' : 'Within 24 hours'}</strong></div>
          </div>
          <p>{rtl ? 'ہم آپ کی معلومات کی تصدیق کر رہے ہیں۔ نتیجہ آنے تک نئی درخواست جمع نہیں ہو سکتی۔' : 'We are checking your credit information. You cannot submit a new loan request until the review is complete.'}</p>
        </section>
      )}
      {(state === 'rejectedRetry' || state === 'rejectedFinal') && (
        <section className={`home-message-card ${state}`}>
          <AlertTriangle />
          <h2>{copy.title}</h2>
        </section>
      )}
      {state === 'coolingCancelBlocked' && (
        <section className="home-state-card coolingCancelBlocked">
          <div className="home-state-icon"><LockKeyhole /></div>
          <h2>{copy.title}</h2>
          <div className="home-detail-list">
            <div><span>{rtl ? 'منسوخ شدہ آرڈر' : 'Cancelled Order'}</span><strong>LN-2026052308</strong></div>
            <div><span>{rtl ? 'منسوخی کا وقت' : 'Cancelled At'}</span><strong>23 May 2026 09:20</strong></div>
            <div><span>{rtl ? 'دوبارہ قرض دستیاب' : 'Next Borrowing Time'}</span><strong>26 May 2026 09:20</strong></div>
          </div>
          <p>{rtl ? 'کولنگ آف مدت میں آرڈر منسوخ ہونے کے بعد، نظام عارضی طور پر نئی قرض درخواست محدود کرتا ہے۔ مقررہ وقت کے بعد دوبارہ کوشش کریں۔' : 'After cancelling an order during the cooling-off period, new borrowing is temporarily limited. Please try again after the next borrowing time.'}</p>
          <Button variant="outline">{copy.cta}</Button>
        </section>
      )}
      {state === 'choose' && (
        <section className="home-state-card choose">
          <h2>{copy.title}</h2>
          <div className="home-amount-select">
            <strong><small>PKR</small>5,200</strong>
            <div className="range"><span style={{ width: '100%' }} /></div>
            <div className="range-labels"><span>PKR 2,200</span><span>PKR 5,200</span></div>
          </div>
          <h3>{rtl ? 'ادائیگی منصوبہ' : 'Repayment Plan'}</h3>
          <div className="home-plan-grid">
            {['2 Installment', '3 Installments', '4 Installments', '5 Installments', '6 Installments'].map((item, index) => (
              <button className={index === 0 ? 'selected' : ''} key={item}>{rtl ? item.replace('Installment', 'قسط').replace('Installments', 'اقساط') : item}</button>
            ))}
          </div>
          <Button>{copy.cta}</Button>
        </section>
      )}
      {(state === 'remaining' || state === 'dueSoon' || state === 'overdue' || state === 'multipleOverdue') && (
        <section className={`home-state-card repayment ${state}`}>
          <div className="home-state-icon">{(state === 'overdue' || state === 'multipleOverdue') ? <AlertTriangle /> : state === 'dueSoon' ? <Bell /> : <Calendar />}</div>
          <h2>{copy.title}</h2>
          <div className="home-detail-list">
            {state === 'remaining' && (
              <>
                <div><span>{rtl ? 'جاری رقم' : 'Disbursed Amount'}</span><strong>PKR 30,000</strong></div>
                <div><span>{rtl ? 'کل ادائیگی' : 'Total Repayment'}</span><strong>PKR 36,000</strong></div>
                <div><span>{rtl ? 'آخری تاریخ' : 'Due Date'}</span><strong>05 Apr 2026</strong></div>
              </>
            )}
            {state === 'dueSoon' && (
              <>
                <div><span>{rtl ? 'جاری رقم' : 'Disbursed Amount'}</span><strong>PKR 30,000</strong></div>
                <div><span>{rtl ? 'کل ادائیگی' : 'Total Repayment'}</span><strong>PKR 36,000</strong></div>
                <div><span>{rtl ? 'آخری تاریخ' : 'Due Date'}</span><strong>Today / 24 Mar 2026</strong></div>
              </>
            )}
            {state === 'overdue' && (
              <>
                <div><span>{rtl ? 'تاخیر شدہ رقم' : 'Overdue Amount'}</span><strong>PKR 36,000</strong></div>
                <div><span>{rtl ? 'تاخیر کے دن' : 'Overdue Days'}</span><strong>5 days</strong></div>
                <div><span>{rtl ? 'تاخیر فیس' : 'Late Fee'}</span><strong>PKR 800</strong></div>
                <div><span>{rtl ? 'کل ادائیگی' : 'Total Repayment'}</span><strong>PKR 36,800</strong></div>
              </>
            )}
            {state === 'multipleOverdue' && (
              <>
                <div><span>{rtl ? 'تاخیر شدہ بل' : 'Overdue Bills'}</span><strong>3 bills</strong></div>
                <div><span>{rtl ? 'سب سے پرانا تاخیر' : 'Oldest Overdue'}</span><strong>12 days</strong></div>
                <div><span>{rtl ? 'تاخیر فیس' : 'Late Fees'}</span><strong>PKR 1,650</strong></div>
                <div><span>{rtl ? 'کل واجب الادا' : 'Total Payable'}</span><strong>PKR 42,650</strong></div>
              </>
            )}
          </div>
          <p>{state === 'multipleOverdue'
            ? (rtl ? 'آپ کے ایک سے زیادہ بل مقررہ تاریخ سے گزر چکے ہیں۔ مزید فیس اور قرض اہلیت پر اثر سے بچنے کے لیے پہلے واجب الادا بل ادا کریں۔' : 'More than one bill has passed its due date. Please settle the oldest bills first to avoid additional fees and eligibility impact.')
            : state === 'overdue'
              ? (rtl ? 'براہ کرم جلد از جلد ادائیگی کریں۔ تاخیر مستقبل کی اہلیت متاثر کر سکتی ہے۔' : 'Please repay as soon as possible. Late repayment may affect your future eligibility.')
            : state === 'dueSoon'
              ? (rtl ? 'تاخیر فیس سے بچنے کے لیے وقت پر ادائیگی کریں۔' : 'Pay on time to avoid late charges. Your repayment is due soon.')
              : (rtl ? 'اچھا ریکارڈ برقرار رکھنے کے لیے وقت پر ادائیگی کریں۔' : 'Please repay on time to maintain a good record. Early repayment may improve your credit profile.')}
          </p>
          <Button variant={(state === 'overdue' || state === 'multipleOverdue') ? 'outline' : 'primary'}>{copy.cta}</Button>
        </section>
      )}
      <BannerCarousel rtl={rtl} placement="home" />
      <LocalTrustFooter rtl={rtl} />
    </PhoneFrame>
  );
}

function LoanApplication({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.application : 'Loan Application'} rtl={rtl} noNav>
      <div className="progress-card">
        <strong>{rtl ? 'درخواست کے لیے پروفائل مکمل کریں' : 'Complete profile to apply'}</strong>
        <div className="progress-line"><span style={{ width: '45%' }} /></div>
        <p>{rtl ? '4 میں سے 2 حصے تصدیق شدہ' : '2 of 4 sections verified'}</p>
      </div>
      <Checklist rows={[
        [rtl ? 'ذاتی معلومات' : 'Personal Info', rtl ? 'تصدیق شدہ' : 'Verified', true],
        [rtl ? 'رابطے' : 'Contacts', rtl ? 'ضروری' : 'Required', false],
        [rtl ? 'CNIC تصدیق' : 'CNIC Verification', rtl ? 'ضروری' : 'Required', false],
        [rtl ? 'والٹ اکاؤنٹ' : 'Wallet Account', rtl ? 'ضروری' : 'Required', false],
      ]} />
      <Button>{rtl ? 'تصدیق جاری رکھیں' : 'Continue Verification'}</Button>
    </PhoneFrame>
  );
}

function ApplicationProgress({ active = 'basic', rtl = false }) {
  const steps = {
    basic: { label: rtl ? 'بنیادی' : 'Basic', progress: 50 },
    contact: { label: rtl ? 'رابطہ' : 'Contact', progress: 75 },
    cnic: { label: 'CNIC', progress: 100 },
  };
  const step = steps[active] || steps.basic;
  return (
    <div className="application-progress">
      <div className="application-progress-head">
        <strong>{step.label}</strong>
        <span>{step.progress}% {rtl ? 'مکمل' : 'complete'}</span>
      </div>
      <div className="application-progress-track">
        <i style={{ width: `${step.progress}%` }} />
      </div>
    </div>
  );
}

function ApplicationTrustStrip({ rtl = false }) {
  const items = rtl
    ? ['SECP لائسنس یافتہ', 'ڈیٹا صرف کریڈٹ جائزے کے لیے', 'کوئی پوشیدہ چارجز نہیں']
    : ['SECP licensed', 'Data used only for credit assessment', 'No hidden charges'];
  return (
    <section className="application-trust-strip">
      <ShieldCheck size={18} />
      <div>
        <p>
          <span>{items[0]}</span>
          <span>{items[2]}</span>
        </p>
        <p>
          <span>{items[1]}</span>
        </p>
      </div>
    </section>
  );
}

function SelectLike({ children, muted = false, icon: Icon = ChevronDown }) {
  return (
    <button className={`select-like ${muted ? 'muted' : ''}`}>
      <span>{children}</span>
      <Icon size={16} />
    </button>
  );
}

function TextLike({ children, muted = false, icon = false }) {
  return (
    <div className={`text-like ${muted ? 'muted' : ''}`}>
      <span>{children}</span>
      {icon && <Calendar size={15} />}
    </div>
  );
}

function CreditApplicationFrame({ children, active = 'basic', rtl = false }) {
  const [showExitDialog, setShowExitDialog] = React.useState(false);
  return (
    <PhoneFrame
      title={rtl ? 'ذاتی معلومات' : 'Personal info'}
      noNav
      showBack
      rtl={rtl}
      className="credit-application-phone"
      onBack={() => setShowExitDialog(true)}
      rightSlot={<button className="icon-btn" aria-label="Customer care"><Headphones size={21} /></button>}
    >
      <ApplicationProgress active={active} rtl={rtl} />
      <ApplicationTrustStrip rtl={rtl} />
      {children}
      <CreditLegalFooter rtl={rtl} />
      {showExitDialog && (
        <div className="credit-exit-overlay">
          <div className="credit-exit-dialog">
            <div className="retention-icon"><ShieldCheck /></div>
            <h3>Leave application?</h3>
            <p>You are about to get a credit limit of up to PKR 50,000.</p>
            <div className="retention-benefits">
              <span><Check size={15} /> Takes about 2 minutes</span>
              <span><Check size={15} /> Secure data protection</span>
              <span><Check size={15} /> Faster review after completion</span>
            </div>
            <div className="retention-actions">
              <button className="btn primary" type="button" onClick={() => setShowExitDialog(false)}>Continue Application</button>
              <Button variant="outline" wide={false} className="retention-home-link">Back to Home</Button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}

function CreditLegalFooter({ rtl = false }) {
  return (
    <div className="credit-legal">
      <span>{rtl ? 'براہ کرم پڑھیں' : 'Please read'}&nbsp;</span>
      <button>{rtl ? 'پرائیویسی پالیسی' : 'Privacy Policy'}</button>
      <span>·</span>
      <button>{rtl ? 'شرائط و ضوابط' : 'Terms and Conditions'}</button>
      <span>·</span>
      <button>{rtl ? 'صارف ڈیٹا پالیسی' : 'User Data Policy'}</button>
    </div>
  );
}

function CreditBasicSection({ rtl = false, otherLoans = false, overLimit = false }) {
  return (
    <CreditApplicationFrame active="basic" rtl={rtl}>
      <section className="credit-form-card">
        <h3>{rtl ? 'بنیادی پروفائل' : 'Basic profile'}</h3>
        <p className="section-helper">
          {rtl
            ? 'یہ معلومات آپ کی بنیادی اہلیت اور مناسب کریڈٹ حد کا اندازہ لگانے میں مدد دیتی ہیں۔'
            : 'These details help us check your basic eligibility and match a suitable credit limit.'}
        </p>
        {otherLoans ? (
          <>
            <ResultField label={rtl ? 'تعلیمی سطح' : 'Education Level'} value="Intermediate" />
            <ResultField label={rtl ? 'ازدواجی حیثیت' : 'Marital Status'} value={rtl ? 'شادی شدہ' : 'Married'} />
            <ResultField label={rtl ? 'بچوں کی تعداد' : 'Number of Children'} value="2" />
            <TextLike muted>{rtl ? 'ای میل ایڈریس (اختیاری)' : 'Email Address (Optional)'}</TextLike>
          </>
        ) : (
          <>
            <SelectLike>{rtl ? 'تعلیمی سطح' : 'Education Level'}</SelectLike>
            <SelectLike>{rtl ? 'ازدواجی حیثیت' : 'Marital Status'}</SelectLike>
            <SelectLike>{rtl ? 'بچوں کی تعداد' : 'Number of Children'}</SelectLike>
            <TextLike muted>{rtl ? 'ای میل ایڈریس (اختیاری)' : 'Email Address (Optional)'}</TextLike>
          </>
        )}
      </section>
      <section className="credit-form-card">
        <h3>{rtl ? 'آمدنی اور ادائیگی کی صلاحیت' : 'Income & repayment ability'}</h3>
        <p className="section-helper">
          {rtl
            ? 'ہم اس سے ایسی رقم کا اندازہ لگاتے ہیں جو آپ آسانی سے واپس کر سکیں۔'
            : 'We use this to estimate a loan amount you can repay safely.'}
        </p>
        {otherLoans ? (
          <>
            <ResultField label={rtl ? 'پیشہ' : 'Occupation'} value={rtl ? 'تنخواہ دار' : 'Salaried'} />
            <ResultField label={rtl ? 'ماہانہ آمدنی' : 'Monthly Income'} value="PKR 80,000 - 120,000" />
            <ResultField label={rtl ? 'صنعت' : 'Industry'} value={rtl ? 'خدمات' : 'Services'} />
            <ResultField label={rtl ? 'تنخواہ کی مدت' : 'Pay Period'} value={rtl ? 'ماہانہ' : 'Monthly'} />
            <ResultField label={rtl ? 'تنخواہ کا دن' : 'Salary Day'} value={rtl ? 'ہر ماہ 15 تاریخ' : 'Day 15 of every month'} icon />
          </>
        ) : (
          <>
            <SelectLike>{rtl ? 'پیشہ' : 'Occupation'}</SelectLike>
            <SelectLike>{rtl ? 'ماہانہ آمدنی' : 'Monthly Income'}</SelectLike>
            <SelectLike>{rtl ? 'صنعت' : 'Industry'}</SelectLike>
            <SelectLike>{rtl ? 'تنخواہ کی مدت' : 'Pay Period'}</SelectLike>
            <SelectLike icon={Calendar}>{rtl ? 'تنخواہ کا دن' : 'Salary Day'}</SelectLike>
          </>
        )}
      </section>
      <section className="other-loans">
        <h3>{rtl ? 'کیا آپ کے دیگر پلیٹ فارمز پر قرض ہیں؟' : 'Do you have loans on other platforms?'}</h3>
        <div className="other-loan-options">
          <label><input type="radio" name={otherLoans ? 'other-loans-yes' : 'other-loans-no'} defaultChecked={!otherLoans} /> <span>{rtl ? 'نہیں' : 'NO'}</span></label>
          <label><input type="radio" name={otherLoans ? 'other-loans-yes' : 'other-loans-no'} defaultChecked={otherLoans} /> <span>{rtl ? 'ہاں' : 'YES'}</span></label>
        </div>
        {otherLoans && (
          <div className="loan-amount-card">
            <span>{rtl ? 'کل قرض کی رقم' : 'total loan amount'}</span>
            <SelectLike>{overLimit ? '> PKR 100000' : '< PKR 5000'}</SelectLike>
            {overLimit && (
              <p className="field-error">
                {rtl ? 'آپ دیگر پلیٹ فارمز پر موجود قرض کی وجہ سے اہل نہیں ہیں۔' : 'You do not meet the loan requirements because your outstanding loans on other platforms exceed the limit.'}
              </p>
            )}
          </div>
        )}
      </section>
      <Button variant={otherLoans ? (overLimit ? 'disabled' : 'primary') : 'disabled'}>{rtl ? 'اگلا' : 'Next'}</Button>
    </CreditApplicationFrame>
  );
}

function EducationOptions({ rtl = false }) {
  return (
    <CreditApplicationFrame active="basic" rtl={rtl}>
      <BasicFormFields rtl={rtl} />
      <SelectionSheet
        rtl={rtl}
        title={rtl ? 'تعلیمی سطح منتخب کریں' : 'Select Education Level'}
        options={[
          'Uneducated',
          'Primary School',
          'Middle School',
          'Secondary School',
          'Intermediate',
          'Undergraduate And Above',
          'Bachelors And Above',
        ]}
        selected="Intermediate"
      />
    </CreditApplicationFrame>
  );
}

function MaritalStatusOptions({ rtl = false }) {
  return (
    <CreditApplicationFrame active="basic" rtl={rtl}>
      <BasicFormFields rtl={rtl} educationValue="Intermediate" />
      <SelectionSheet
        rtl={rtl}
        title={rtl ? 'ازدواجی حیثیت منتخب کریں' : 'Select Marital Status'}
        options={rtl ? ['غیر شادی شدہ', 'شادی شدہ', 'طلاق یافتہ', 'بیوہ'] : ['Single', 'Married', 'Divorced', 'Widowed']}
        selected={rtl ? 'شادی شدہ' : 'Married'}
      />
    </CreditApplicationFrame>
  );
}

function ChildrenOptions({ rtl = false }) {
  return (
    <CreditApplicationFrame active="basic" rtl={rtl}>
      <BasicFormFields rtl={rtl} educationValue="Intermediate" maritalValue={rtl ? 'شادی شدہ' : 'Married'} />
      <SelectionSheet
        rtl={rtl}
        title={rtl ? 'بچوں کی تعداد منتخب کریں' : 'Select Number of Children'}
        options={['0', '1', '2', '3', '4', '5+']}
        selected="2"
      />
    </CreditApplicationFrame>
  );
}

function PayPeriodOptions({ rtl = false }) {
  return (
    <CreditApplicationFrame active="basic" rtl={rtl}>
      <BasicFormFields rtl={rtl} educationValue="Intermediate" maritalValue={rtl ? 'شادی شدہ' : 'Married'} />
      <SelectionSheet
        rtl={rtl}
        title={rtl ? 'تنخواہ کی مدت منتخب کریں' : 'Select Pay Period'}
        options={rtl ? ['روزانہ', 'ہفتہ وار', 'ماہانہ', 'دیگر'] : ['Daily', 'Weekly', 'Monthly', 'Other']}
        selected={rtl ? 'ماہانہ' : 'Monthly'}
      />
    </CreditApplicationFrame>
  );
}

function SalaryDayCalendar({ rtl = false }) {
  return (
    <CreditApplicationFrame active="basic" rtl={rtl}>
      <BasicFormFields rtl={rtl} educationValue="Intermediate" maritalValue={rtl ? 'شادی شدہ' : 'Married'} salaryDateValue={rtl ? 'ہر ماہ 15 تاریخ' : 'Day 15 of every month'} />
      <CalendarPickerSheet rtl={rtl} />
    </CreditApplicationFrame>
  );
}

function BasicFormFields({ rtl = false, educationValue, maritalValue, salaryDateValue }) {
  return (
    <>
      <section className="credit-form-card">
        <h3>{rtl ? 'بنیادی پروفائل' : 'Basic profile'}</h3>
        <p className="section-helper">
          {rtl
            ? 'یہ معلومات آپ کی بنیادی اہلیت اور مناسب کریڈٹ حد کا اندازہ لگانے میں مدد دیتی ہیں۔'
            : 'These details help us check your basic eligibility and match a suitable credit limit.'}
        </p>
        {educationValue ? <SelectLike>{educationValue}</SelectLike> : <SelectLike>{rtl ? 'تعلیمی سطح' : 'Education Level'}</SelectLike>}
        {maritalValue ? <SelectLike>{maritalValue}</SelectLike> : <SelectLike>{rtl ? 'ازدواجی حیثیت' : 'Marital Status'}</SelectLike>}
        <SelectLike>{rtl ? 'بچوں کی تعداد' : 'Number of Children'}</SelectLike>
      </section>
      <section className="credit-form-card">
        <h3>{rtl ? 'آمدنی اور ادائیگی کی صلاحیت' : 'Income & repayment ability'}</h3>
        <p className="section-helper">
          {rtl
            ? 'ہم اس سے ایسی رقم کا اندازہ لگاتے ہیں جو آپ آسانی سے واپس کر سکیں۔'
            : 'We use this to estimate a loan amount you can repay safely.'}
        </p>
        <SelectLike>{rtl ? 'پیشہ' : 'Occupation'}</SelectLike>
        <SelectLike>{rtl ? 'ماہانہ آمدنی' : 'Monthly Income'}</SelectLike>
        <SelectLike>{rtl ? 'صنعت' : 'Industry'}</SelectLike>
        <SelectLike>{rtl ? 'تنخواہ کی مدت' : 'Pay Period'}</SelectLike>
        {salaryDateValue ? <SelectLike icon={Calendar}>{salaryDateValue}</SelectLike> : <SelectLike icon={Calendar}>{rtl ? 'تنخواہ کا دن' : 'Salary Day'}</SelectLike>}
      </section>
    </>
  );
}

function CalendarPickerSheet({ rtl = false }) {
  const days = Array.from({ length: 31 }, (_, index) => ({ day: index + 1, selected: index + 1 === 15 }));

  return (
    <div className="selection-overlay">
      <div className="selection-sheet calendar-sheet" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="sheet-grabber" />
        <div className="sheet-head calendar-sheet-head">
          <strong>{rtl ? 'تنخواہ کا دن منتخب کریں' : 'Select Salary Day'}</strong>
          <span>{rtl ? 'ہر ماہ تنخواہ ملنے والی تاریخ منتخب کریں۔' : 'Choose which day of each month your salary is paid.'}</span>
        </div>
        <div className="calendar-grid calendar-days">
          {days.map((date, index) => (
            <button className={date.selected ? 'selected' : ''} key={`${date.day}-${index}`}>
              {date.day}
            </button>
          ))}
        </div>
        <button className="calendar-confirm" type="button">{rtl ? 'تاریخ منتخب کریں' : 'Select Date'}</button>
      </div>
    </div>
  );
}

function SelectionSheet({ rtl = false, title, options, selected }) {
  return (
    <div className="selection-overlay">
      <div className="selection-sheet" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="sheet-grabber" />
        <div className="sheet-head">
          <strong>{title}</strong>
        </div>
        <div className="sheet-options">
          {options.map((option) => (
            <button className={option === selected ? 'selected' : ''} key={option}>
              <span>{option}</span>
              {option === selected && <Check size={17} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactApplication({ rtl = false }) {
  return (
    <CreditApplicationFrame active="contact" rtl={rtl}>
      <section className="reference-trust-note">
        <Info size={17} />
        <p>
          {rtl
            ? 'حوالہ رابطے صرف تصدیق کے لیے استعمال ہوں گے۔ ہم انہیں مارکیٹنگ کے لیے استعمال نہیں کریں گے اور غیر ضروری رابطہ نہیں کریں گے۔'
            : 'Reference contacts are used only for verification. We will not use them for marketing or contact them unnecessarily.'}
        </p>
      </section>
      <section className="credit-form-card contact-card">
        {[1, 2].map((n) => (
          <div className="reference-block" key={n}>
            <div className="reference-head">
              <h3>{rtl ? `حوالہ رابطہ ${n}` : `Reference Contact ${n}`}</h3>
              <button>{rtl ? 'منتخب کریں' : 'Select'}</button>
            </div>
            <TextLike muted>{rtl ? 'مکمل نام' : 'Full Name'}</TextLike>
            <SelectLike>{rtl ? 'رشتہ' : 'Relationship'}</SelectLike>
            {n === 1 ? (
              <div className="phone-input-state">
                <TextLike>{'03'}</TextLike>
                <p>{rtl ? '03 سے شروع ہونے والا 11 ہندسوں کا نمبر درج کریں۔' : 'Supports 11-digit mobile numbers starting with 03.'}</p>
              </div>
            ) : (
              <TextLike muted>{rtl ? 'موبائل فون نمبر' : 'Mobile phone number'}</TextLike>
            )}
          </div>
        ))}
      </section>
      <div className="credit-spacer" />
    </CreditApplicationFrame>
  );
}

function CnicUploadPreview({ label, hint, failed = false, rtl = false }) {
  return (
    <button className={`cnic-shot ${failed ? 'failed' : ''}`} type="button">
      <div className="cnic-chip" />
      <Camera size={18} />
      <span>{label}</span>
      <small>{hint}</small>
      {failed && (
        <div className="cnic-shot-status" role="alert">
          <strong>{rtl ? 'اپ لوڈ ناکام' : 'uploaded failure'}</strong>
        </div>
      )}
    </button>
  );
}

function CnicExample({ status = 'good', type = 'clear', label }) {
  const Icon = status === 'good' ? Check : X;
  return (
    <div className={`cnic-example ${status} ${type}`}>
      <div className="mini-cnic">
        <span className="mini-chip" />
        <span className="mini-photo" />
        <span className="mini-line one" />
        <span className="mini-line two" />
        <span className="mini-line three" />
      </div>
      <Icon size={status === 'good' ? 18 : 11} />
      {label && <small>{label}</small>}
    </div>
  );
}

function CnicApplication({ rtl = false, uploadFailureSide = null }) {
  return (
    <CreditApplicationFrame active="cnic" rtl={rtl}>
      <section className={`cnic-upload ${uploadFailureSide ? 'upload-failure' : ''}`}>
        <h3>{rtl ? 'اپنا CNIC اپ لوڈ کریں' : 'Upload Your CNIC'}</h3>
        <p>
          {rtl
            ? 'براہ کرم CNIC کی تصویر لیں۔ یہ آپ کی شناخت کی تصدیق اور کسی دوسرے شخص کے غلط استعمال سے بچانے کے لیے ہے۔'
            : 'Please take a photo of the CNIC. This confirms your identity and helps prevent someone else from applying in your name.'}
        </p>
        <div className="cnic-preview-row">
          <CnicUploadPreview
            label={rtl ? 'سامنے' : 'Front'}
            hint={rtl ? 'تصویر لیں' : 'Tap to take photo'}
            failed={uploadFailureSide === 'front'}
            rtl={rtl}
          />
          <CnicUploadPreview
            label={rtl ? 'پیچھے' : 'Back'}
            hint={rtl ? 'تصویر لیں' : 'Tap to take photo'}
            failed={uploadFailureSide === 'back'}
            rtl={rtl}
          />
        </div>
        {uploadFailureSide && (
          <small className="cnic-upload-failure-note">
            {rtl ? 'براہ کرم CNIC کی واضح تصویر لیں۔ آج آپ کے پاس 1 استعمال باقی ہے۔' : 'Please take a clear CNIC photo.You have 1 uses left today.'}
          </small>
        )}
        <ul className="cnic-local-tips">
          {(rtl
            ? ['CNIC کو گہرے پس منظر پر رکھیں', 'فلیش کی روشنی براہ راست کارڈ پر نہ ڈالیں', 'چاروں کونے مکمل نظر آنے چاہئیں']
            : ['Place the CNIC on a dark background', 'Avoid direct flash on the laminated card', 'Keep all four corners visible']
          ).map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
        <div className="photo-technique">
          <span />
          <strong>{rtl ? 'CNIC تصویر لینے کی تکنیک' : 'Taking CNIC Picture Techniques'}</strong>
          <span />
        </div>
        <div className="cnic-good">
          <CnicExample status="good" type="clear" />
          <small>{rtl ? 'واضح اور مکمل CNIC دکھائیں' : 'Show clear and complete CNIC'}</small>
        </div>
        <div className="cnic-bad-row">
          <CnicExample status="bad" type="blur" label={rtl ? 'دھندلا' : 'Blurred'} />
          <CnicExample status="bad" type="crop" label={rtl ? 'کٹا ہوا' : 'Cut off'} />
          <CnicExample status="bad" type="glare" label={rtl ? 'چمک' : 'Glare'} />
        </div>
      </section>
    </CreditApplicationFrame>
  );
}

function CnicPhotoPreview({ side = 'front', label }) {
  return (
    <div className={`cnic-photo-preview ${side}`}>
      <span className="photo-chip" />
      <span className="photo-portrait" />
      <span className="photo-line one" />
      <span className="photo-line two" />
      <span className="photo-line three" />
      <span>{label || (side === 'front' ? 'Front' : 'Back')}</span>
    </div>
  );
}

function CnicCamera({ rtl = false, confirm = false }) {
  return (
    <PhoneFrame
      title={rtl ? 'CNIC تصویر' : 'CNIC Photo'}
      noNav
      rtl={rtl}
      className={`cnic-camera-phone ${confirm ? 'review' : ''}`}
      rightSlot={<button className="icon-btn" aria-label="Customer care"><Headphones size={21} /></button>}
    >
      <div className="camera-canvas">
        <div className="camera-frame">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p>{rtl ? 'براہ کرم اپنا CNIC فون کے فریم میں رکھیں۔' : 'Please place your CNIC in this frame for a photo.'}</p>
        {confirm && (
          <div className="camera-review-actions">
            <button aria-label="Retake"><X size={18} /><span>{rtl ? 'دوبارہ' : 'Retake'}</span></button>
            <button aria-label="Use photo"><Check size={18} /><span>{rtl ? 'تصویر استعمال کریں' : 'Use Photo'}</span></button>
          </div>
        )}
      </div>
      {confirm ? (
        <span />
      ) : (
        <button className="camera-shutter" aria-label="Take CNIC photo"><Camera size={28} /></button>
      )}
    </PhoneFrame>
  );
}

function CnicFilledApplication({ rtl = false, showCitySheet = true }) {
  return (
    <CreditApplicationFrame active="cnic" rtl={rtl}>
      <section className="cnic-upload filled">
        <h3>{rtl ? 'اپنا CNIC اپ لوڈ کریں' : 'Upload Your CNIC'}</h3>
        <p>
          {rtl
            ? 'براہ کرم CNIC کی تصویر لیں۔ یہ آپ کی شناخت کی تصدیق اور کسی دوسرے شخص کے غلط استعمال سے بچانے کے لیے ہے۔'
            : 'Please take a photo of the CNIC. This confirms your identity and helps prevent someone else from applying in your name.'}
        </p>
        <div className="cnic-preview-row">
          <CnicPhotoPreview side="front" label={rtl ? 'سامنے' : 'Front'} />
          <CnicPhotoPreview side="back" label={rtl ? 'پیچھے' : 'Back'} />
        </div>
        <ul className="cnic-local-tips">
          {(rtl
            ? ['CNIC کو گہرے پس منظر پر رکھیں', 'فلیش کی روشنی براہ راست کارڈ پر نہ ڈالیں', 'چاروں کونے مکمل نظر آنے چاہئیں']
            : ['Place the CNIC on a dark background', 'Avoid direct flash on the laminated card', 'Keep all four corners visible']
          ).map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
        <div className="photo-technique">
          <span />
          <strong>{rtl ? 'CNIC تصویر لینے کی تکنیک' : 'Taking CNIC Picture Techniques'}</strong>
          <span />
        </div>
        <div className="cnic-good">
          <CnicExample status="good" type="clear" />
          <small>{rtl ? 'واضح اور مکمل CNIC دکھائیں' : 'Show clear and complete CNIC'}</small>
        </div>
        <div className="cnic-bad-row">
          <CnicExample status="bad" type="blur" label={rtl ? 'دھندلا' : 'Blurred'} />
          <CnicExample status="bad" type="crop" label={rtl ? 'کٹا ہوا' : 'Cut off'} />
          <CnicExample status="bad" type="glare" label={rtl ? 'چمک' : 'Glare'} />
        </div>
      </section>
      <section className="credit-form-card cnic-info">
        <h3>{rtl ? 'CNIC معلومات' : 'CNIC Information'}</h3>
        <ResultField label={rtl ? 'CNIC نمبر' : 'CNIC Number'} value="42101-1234567-1" />
        <ResultField label={rtl ? 'مکمل نام' : 'Full Name'} value="Ayesha Khan" />
        <div className="city-picker-field">
          <button className="select-like">
            <span><small>{rtl ? 'صوبہ / شہر' : 'Province / City'}</small>{rtl ? 'پنجاب، لاہور' : 'Punjab, Lahore'}</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <div className="address-invalid">
          <ResultField label={rtl ? 'رہائشی پتہ' : 'Residential Address'} value={rtl ? 'House 12' : 'House 12'} />
          <p>{rtl ? 'براہ کرم مکمل پتہ درج کریں، مثال: گھر نمبر، گلی، علاقہ۔' : 'Please enter a complete address, including house number, street and area.'}</p>
        </div>
        <ResultField label={rtl ? 'تاریخ پیدائش' : 'Date of Birth'} value="20-May-1996" icon />
        <ResultField label={rtl ? 'اجرا کی تاریخ' : 'Date of Issue'} value="27-May-2021" icon />
        <div className="result-field gender-result-field">
          <span>{rtl ? 'جنس' : 'Gender'}</span>
          <div className="gender-options">
            <label><input type="radio" name={rtl ? 'gender-filled-rtl' : 'gender-filled'} defaultChecked /> <span>{rtl ? 'مرد' : 'Male'}</span></label>
            <label><input type="radio" name={rtl ? 'gender-filled-rtl' : 'gender-filled'} /> <span>{rtl ? 'عورت' : 'Female'}</span></label>
          </div>
        </div>
      </section>
      {showCitySheet && <CitySelectionSheet rtl={rtl} />}
      <Button variant="disabled">{rtl ? 'اگلا' : 'Next'}</Button>
    </CreditApplicationFrame>
  );
}

function CitySelectionSheet({ rtl = false }) {
  const provinces = rtl ? ['سندھ', 'پنجاب', 'خیبر پختونخوا'] : ['Sindh', 'Punjab', 'KPK'];
  const cities = rtl ? ['راولپنڈی', 'لاہور', 'فیصل آباد'] : ['Rawalpindi', 'Lahore', 'Faisalabad'];
  const selectedProvince = rtl ? 'پنجاب' : 'Punjab';
  const selectedCity = rtl ? 'لاہور' : 'Lahore';
  return (
    <div className="selection-overlay city-selection-overlay">
      <div className="selection-sheet city-selection-sheet" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="sheet-grabber" />
        <div className="sheet-head">
          <strong>{rtl ? 'صوبہ اور شہر منتخب کریں' : 'Select Province and City'}</strong>
        </div>
        <div className="city-sheet-grid">
          <div>
            <h4>{rtl ? 'صوبہ' : 'Province'}</h4>
            {provinces.map((option) => (
              <button className={option === selectedProvince ? 'selected' : ''} key={option}>
                <span>{option}</span>
                {option === selectedProvince && <Check size={16} />}
              </button>
            ))}
          </div>
          <div>
            <h4>{rtl ? 'شہر' : 'City'}</h4>
            {cities.map((option) => (
              <button className={option === selectedCity ? 'selected' : ''} key={option}>
                <span>{option}</span>
                {option === selectedCity && <Check size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultField({ label, value, icon = false }) {
  return (
    <div className="result-field">
      <span>{label}</span>
      <strong>{value}{icon && <Calendar size={16} />}</strong>
    </div>
  );
}

function WalletChoice({ name, logo, active = false }) {
  return (
    <button className={`wallet-choice ${active ? 'active' : ''}`}>
      <img src={logo} alt={`${name} logo`} />
    </button>
  );
}

function WithdrawalMethod({ rtl = false }) {
  return (
    <PhoneFrame
      title={rtl ? 'رقم وصول کرنے کا طریقہ شامل کریں' : 'Add Withdrawal Method'}
      rtl={rtl}
      noNav
      className="withdrawal-phone"
      rightSlot={<span className="topbar-spacer" />}
    >
      <section className="withdrawal-hero">
        <h2>{rtl ? 'فنڈز وصول کرنے کے لیے اپنا موبائل والٹ منتخب کریں' : 'Select your mobile wallet to receive funds'}</h2>
        <p>
          {rtl
            ? 'اس سے ہم تصدیق کرتے ہیں کہ رقم آپ کے اپنے Easypaisa یا JazzCash اکاؤنٹ میں جائے گی۔'
            : 'This confirms the money will be sent to your own Easypaisa or JazzCash account.'}
        </p>
      </section>
      <div className="wallet-grid">
        <WalletChoice name="Easypaisa" logo={walletLogos.easypaisa} active />
        <WalletChoice name="JazzCash" logo={walletLogos.jazzcash} />
      </div>
      <label className="wallet-number">
        <span>{rtl ? 'موبائل والٹ اکاؤنٹ نمبر' : 'Mobile Wallet Account Number'}</span>
        <div>0312334356</div>
      </label>
      <div className="wallet-note">
        <Info size={18} />
        <p>{rtl ? 'یقینی بنائیں کہ یہ نمبر منتخب موبائل والٹ کے ساتھ رجسٹرڈ ہے۔ بصورت دیگر مختلف اکاؤنٹ استعمال کریں۔' : 'Make sure this number is registered with your selected mobile wallet. Otherwise, please use a different account.'}</p>
      </div>
      <div className="credit-spacer" />
      <Button>{rtl ? 'اگلا' : 'Next'}</Button>
    </PhoneFrame>
  );
}

function WalletConfirmDialog() {
  return (
    <div className="wallet-dialog-board">
      <div className="wallet-confirm-modal">
        <div className="wallet-confirm-hero">
          <img src={walletLogos.easypaisa} alt="Easypaisa logo" />
          <h3>Confirm Mobile Wallet Information</h3>
        </div>
        <p>Your information will be kept confidential and used only for loan processing and credit assessment.</p>
        <p>For your security, please do not share your personal details with anyone.</p>
        <div className="wallet-confirm-details">
          <ResultField label="Mobile Wallet" value="Easypaisa" />
          <ResultField label="Mobile Number" value="0312334356" />
          <ResultField label="Mobile name" value="aouw Idsa" />
        </div>
        <div className="wallet-confirm-actions">
          <Button variant="outline" wide={false}>Modify</Button>
          <Button wide={false}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

function WalletUnavailableDialog({ rtl = false, onModify, onClose }) {
  return (
    <div
      className="loan-info-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-unavailable-title"
      onClick={onClose}
    >
      <div className="wallet-confirm-modal wallet-unavailable-modal" onClick={(event) => event.stopPropagation()}>
        <div className="wallet-confirm-hero wallet-unavailable-hero">
          <span className="wallet-warning-icon"><AlertTriangle size={28} /></span>
          <img src={walletLogos.easypaisa} alt="Easypaisa logo" />
          <h3 id="wallet-unavailable-title">{rtl ? 'موبائل والٹ دستیاب نہیں' : 'Mobile Wallet Unavailable'}</h3>
        </div>
        <p>
          {rtl
            ? 'والٹ کمپنی نے بتایا ہے کہ یہ اکاؤنٹ فی الحال فنڈز وصول نہیں کر سکتا۔'
            : 'The wallet provider says this account is currently unavailable to receive funds.'}
        </p>
        <p>
          {rtl
            ? 'درخواست جاری رکھنے کے لیے براہ کرم دوسرا Easypaisa یا JazzCash اکاؤنٹ استعمال کریں۔'
            : 'Please update your Easypaisa or JazzCash account to continue this application.'}
        </p>
        <div className="wallet-confirm-details">
          <ResultField label={rtl ? 'موبائل والٹ' : 'Mobile Wallet'} value="Easypaisa" />
          <ResultField label={rtl ? 'موبائل نمبر' : 'Mobile Number'} value="****67347" />
          <ResultField label={rtl ? 'صورتحال' : 'Status'} value={rtl ? 'دستیاب نہیں' : 'Unavailable'} />
        </div>
        <div className="wallet-confirm-actions">
          <Button variant="outline" wide={false} type="button" onClick={onClose}>{rtl ? 'بعد میں' : 'Later'}</Button>
          <Button wide={false} type="button" onClick={onModify}>{rtl ? 'والٹ تبدیل کریں' : 'Modify Wallet'}</Button>
        </div>
      </div>
    </div>
  );
}

function CreditLimitDialog() {
  return (
    <div className="credit-dialog-board">
      <div className="credit-limit-dialog">
        <p>Your outstanding loans on other platforms exceed the limit. You cannot apply at this time.</p>
        <Button wide={false}>back</Button>
      </div>
    </div>
  );
}

function CalculatorPage({ rtl = false, months = 3 }) {
  const total = months === 3 ? '66,875' : '83,750';
  const per = months === 3 ? '22,291.66' : '13,958.33';
  return (
    <PhoneFrame title={rtl ? u.calculator : 'Loan Calculator'} rtl={rtl} noNav>
      <section className="amount-card">
        <span>{rtl ? 'رقم' : 'Amount'}</span>
        <strong><small>PKR</small>{money}</strong>
        <div className="range"><span style={{ width: '86%' }} /></div>
        <div className="range-labels"><span>PKR 2,200</span><span>PKR 52,000</span></div>
      </section>
      <h2 className="section-title">{rtl ? 'اقساط کی تعداد منتخب کریں' : 'Choose number of installments'}</h2>
      <div className="segmented">
        <button className={months === 3 ? 'active' : ''}>{rtl ? '3 اقساط' : '3 installments'}<br /><small>{rtl ? '45 دن' : '45 days'}</small></button>
        <button className={months === 6 ? 'active' : ''}>{rtl ? '6 اقساط' : '6 installments'}<br /><small>{rtl ? '90 دن' : '90 days'}</small></button>
      </div>
      <div className="fee-card">
        {[
          [rtl ? 'روزانہ شرح' : 'Daily Rate', '0.75%'],
          ['APR', '273.75%'],
          [rtl ? 'مارک اپ' : 'Markup', months === 3 ? 'PKR 15,187.5' : 'PKR 30,375'],
          [rtl ? 'سروس فیس' : 'Service Fee', months === 3 ? 'PKR 1,685.5' : 'PKR 3,375'],
          [rtl ? 'تاخیر فیس' : 'Late fee', rtl ? '2.3% روزانہ' : '2.3% per day'],
          [rtl ? 'کل ادائیگی' : 'Total Repayment', `PKR ${total}`],
        ].map(([a, b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}
      </div>
      <h2 className="section-title">{rtl ? 'قسطوں کا شیڈول' : 'Installment schedule'}</h2>
      <div className="schedule">
        {Array.from({ length: months }).map((_, i) => (
          <div key={i}>
            <span>{i + 1}/{months}</span>
            <p>{['01 Jan 2026', '01 Feb 2026', '01 Mar 2026', '01 Apr 2026', '01 May 2026', '01 Jun 2026'][i]}</p>
            <strong>PKR {per}</strong>
          </div>
        ))}
      </div>
      <div className="sticky-cta"><Button>{rtl ? u.apply : 'Apply Now'}</Button><small>{rtl ? 'درخواست دے کر آپ پالیسی اور شرائط سے اتفاق کرتے ہیں۔' : 'By applying you agree to Privacy Policy and Terms.'}</small></div>
    </PhoneFrame>
  );
}

function Checklist({ rows }) {
  return <div className="list-card">{rows.map(([label, status, ok]) => <button key={label}><div><strong>{label}</strong><span className={ok ? 'ok' : 'warn'}>{status}</span></div><ChevronRight /></button>)}</div>;
}

function Profile({ rtl = false, loggedIn = true }) {
  return (
    <PhoneFrame tab="profile" rtl={rtl}>
      <BrandHeader rtl={rtl} />
      <div className="profile-head">
        <div className="avatar"><User /></div>
        <div><strong className={loggedIn ? 'ltr-token' : ''}>{loggedIn ? '033****4227' : (rtl ? 'لاگ ان' : 'Log in')}</strong><p>{loggedIn ? (rtl ? 'تصدیق شدہ موبائل اکاؤنٹ' : 'Verified mobile account') : (rtl ? 'قرض ٹولز اور پروفائل تک رسائی' : 'Access your loan tools and profile')}</p></div>
        {!loggedIn && <ChevronRight />}
      </div>
      <div className="quick-grid">
        <button><Ticket />{rtl ? 'ڈسکاؤنٹس' : 'Discounts'}</button>
        <button><Calculator />{rtl ? u.calculator : 'Loan Calculator'}</button>
      </div>
      <AccountNoticeCarousel rtl={rtl} />
      <MenuList rows={rtl ? [u.profile, u.about, u.faq, 'شرائط', u.settings] : ['Profile', 'About Us', 'FAQs', 'Terms', 'Settings']} />
      <div className="follow-card">
        <strong>{rtl ? 'ہمیں فالو کریں' : 'Follow Us'}</strong>
        <p>{rtl ? 'آفرز اور سیکیورٹی نوٹس سے باخبر رہیں۔' : 'Stay updated with offers and security notices.'}</p>
        <div><span>TikTok</span><span>Facebook</span><span>Instagram</span><span>YouTube</span></div>
      </div>
      <TrustFooter />
    </PhoneFrame>
  );
}

function MenuList({ rows }) {
  return <div className="menu-list">{rows.map((r) => <button key={r}><span>{r}</span><ChevronRight /></button>)}</div>;
}

function ProfileVerification({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.profile : 'Profile'} rtl={rtl} noNav>
      <Checklist rows={[
        [rtl ? 'ذاتی معلومات' : 'Personal Info', rtl ? 'تصدیق شدہ' : 'Verified', true],
        [rtl ? 'رابطے' : 'Contacts', rtl ? 'تصدیق نہیں ہوئی' : 'Not verified', false],
        ['CNIC', rtl ? 'تصدیق نہیں ہوئی' : 'Not verified', false],
        [rtl ? 'بینک / والٹ' : 'Bank / Wallet', rtl ? 'تصدیق نہیں ہوئی' : 'Not verified', false],
      ]} />
    </PhoneFrame>
  );
}

function Settings({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.settings : 'Settings'} rtl={rtl} noNav>
      <MenuList rows={rtl ? [u.reset, u.devices, u.deletion] : ['Reset Password', 'Devices Manager', 'Account Deletion']} />
      <div className="setting-row"><span>{rtl ? 'اطلاعات' : 'Notification'}</span><label className="switch"><input type="checkbox" defaultChecked /><i /></label></div>
      <Button variant="danger" icon={LogOut}>{rtl ? 'لاگ آؤٹ' : 'Log out'}</Button>
      <p className="version">V 1.1.0</p>
    </PhoneFrame>
  );
}

function ResetPassword({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.reset : 'Reset Password'} rtl={rtl} noNav>
      <h2 className="page-title">{rtl ? 'طریقہ منتخب کریں' : 'Choose retrieval method'}</h2>
      <div className="method-card"><MessageCircle /><div><strong>{rtl ? 'SMS تصدیق' : 'SMS Verification'}</strong><p>{rtl ? 'رجسٹرڈ موبائل نمبر پر OTP وصول کریں۔' : 'Receive OTP on registered mobile number.'}</p></div><ChevronRight /></div>
    </PhoneFrame>
  );
}

function AccountDelete({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.deletion : 'Account Deletion'} rtl={rtl} noNav>
      <div className="danger-hero"><AlertTriangle /><h2>{rtl ? 'اکاؤنٹ حذف کرنے سے پہلے' : 'Before deleting your account'}</h2><p>{rtl ? 'اکاؤنٹ صرف تب حذف ہو سکتا ہے جب تمام واجبات ادا ہوں اور کوئی درخواست زیر جائزہ نہ ہو۔' : 'Your account can be deleted only after all dues are settled and no application is under review.'}</p></div>
      <div className="delete-rules">
        <p><Check /> {rtl ? 'کوئی غیر ادا شدہ قرض یا چارج نہیں' : 'No unpaid loan or overdue charges'}</p>
        <p><Check /> {rtl ? 'کوئی فعال درخواست یا شکایت نہیں' : 'No active application or complaint'}</p>
        <p><Check /> {rtl ? 'والٹ فوائد اور کوپن ختم ہو جائیں گے' : 'Wallet benefits and coupons will be forfeited'}</p>
      </div>
      <div className="delete-actions">
        <Button variant="outline">{rtl ? 'اکاؤنٹ رکھیں' : 'Keep Account'}</Button>
        <Button variant="danger" icon={Trash2}>{rtl ? 'حذف کرنے کی درخواست' : 'Request Deletion'}</Button>
      </div>
    </PhoneFrame>
  );
}

function Devices({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.devices : 'Devices Manager'} rtl={rtl} noNav>
      <h2 className="page-title">{rtl ? 'آن لائن ڈیوائس رسائی' : 'Online device access'}</h2>
      <p className="subtle">{rtl ? 'ڈیوائس بند کرنے پر اکاؤنٹ لاگ آؤٹ ہو جائے گا۔ دوبارہ لاگ ان کے لیے شناختی تصدیق درکار ہوگی۔' : 'If a device is disabled, the account will be logged out. Re-login requires identity verification.'}</p>
      <div className="device-card">
        <Smartphone />
        <div><strong>SM-S9210</strong><p>Samsung · Android</p><span>11 May 2026, 11:53</span></div>
        <em>{rtl ? 'موجودہ' : 'Current'}</em>
      </div>
    </PhoneFrame>
  );
}

function CouponEmpty({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.coupons : 'Coupon'} rtl={rtl} noNav>
      <div className="tabs"><button className="active">{rtl ? 'دستیاب' : 'Available'}</button><button>{rtl ? 'ہسٹری' : 'History'}</button></div>
      <div className="empty-state"><Ticket /><strong>{rtl ? 'ابھی کوئی کوپن نہیں' : 'No coupons yet'}</strong><p>{rtl ? 'دستیاب ڈسکاؤنٹس یہاں دکھیں گے۔' : 'Available discounts will appear here.'}</p></div>
    </PhoneFrame>
  );
}

function FAQ({ rtl = false }) {
  const qs = rtl ? ['پاس ورڈ بھول گئے', 'فون نمبر بند یا گم ہو گیا', 'اکاؤنٹ منسوخی', 'قرض کیسے حاصل کریں', 'ضروری دستاویزات', 'جائزہ کا عمل'] : ['Forgot Password', 'Lost / Deactivated Phone Number', 'Account Cancellation', 'How to get a loan', 'Required documents', 'Review process'];
  return (
    <PhoneFrame title={rtl ? u.faq : 'FAQ'} rtl={rtl} noNav>
      <div className="faq">
        {qs.map((q, i) => (
          <details key={q} open={i === 0}>
            <summary>{q}<ChevronDown /></summary>
            <p>{rtl ? 'اگر رسائی ختم ہو گئی ہے تو OTP تصدیق استعمال کریں یا کسٹمر کیئر سے رابطہ کریں۔' : 'If you have lost access, use OTP verification or contact customer care for assistance.'}</p>
          </details>
        ))}
      </div>
    </PhoneFrame>
  );
}

function TermsList({ rtl = false }) {
  const rows = rtl
    ? ['پرائیویسی پالیسی', 'شرائط و ضوابط', 'صارف ڈیٹا پالیسی']
    : ['Privacy Policy', 'Terms and Conditions', 'User Data Policy'];
  return (
    <PhoneFrame title={rtl ? 'شرائط' : 'Terms'} rtl={rtl} noNav>
      <MenuList rows={rows} />
    </PhoneFrame>
  );
}

function TermsDetail({ rtl = false, type = 'privacy' }) {
  const titles = {
    privacy: rtl ? 'پرائیویسی پالیسی' : 'Privacy Policy',
    terms: rtl ? 'شرائط و ضوابط' : 'Terms and Conditions',
    data: rtl ? 'صارف ڈیٹا پالیسی' : 'User Data Policy',
  };
  return (
    <PhoneFrame title={titles[type]} rtl={rtl} noNav>
      <article className="terms-detail" dir={rtl ? 'rtl' : 'ltr'}>
        <h2>{titles[type]}</h2>
        <p className="updated">{rtl ? 'آخری اپ ڈیٹ: 11 May 2026' : 'Last updated: 11 May 2026'}</p>
        <section>
          <h3>{rtl ? '1. معلومات کا استعمال' : '1. Use of information'}</h3>
          <p>{rtl ? 'یہ صفحہ قانونی/کمپلائنس ٹیم کی منظور شدہ پالیسی کے لیے جگہ محفوظ کرتا ہے۔ حتمی متن اسی جگہ پر لگایا جائے گا۔' : 'This page is a placeholder for the policy text approved by the legal/compliance team. Final content will be placed here.'}</p>
        </section>
        <section>
          <h3>{rtl ? '2. ڈیٹا تحفظ' : '2. Data protection'}</h3>
          <p>{rtl ? 'ذاتی معلومات کو متعلقہ قوانین، پرائیویسی پالیسی اور صارف کی رضامندی کے مطابق پراسیس کیا جائے گا۔' : 'Personal information will be processed according to applicable laws, the Privacy Policy, and user consent.'}</p>
        </section>
        <section>
          <h3>{rtl ? '3. صارف کے حقوق' : '3. User rights'}</h3>
          <p>{rtl ? 'صارف اپنی معلومات، اجازتوں اور اکاؤنٹ سے متعلق درخواستوں کے لیے کسٹمر کیئر سے رابطہ کر سکتا ہے۔' : 'Users may contact customer care for requests related to their information, permissions, and account.'}</p>
        </section>
      </article>
      <div className="terms-ack">
        <Button>{rtl ? 'میں نے پڑھ لیا' : 'I have read'}</Button>
      </div>
    </PhoneFrame>
  );
}

function AboutTerms({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? u.about : 'About Us'} rtl={rtl} noNav>
      <div className="about-card">
        <Building2 />
        <h2>Inyor Finance Services</h2>
        <p>{rtl ? 'پاکستان کے لیے شفاف مختصر مدت مالی سہولت فراہم کرنے والا ڈیجیٹل کریڈٹ پلیٹ فارم۔' : 'A Pakistan-focused digital credit platform designed for transparent short-term financial support.'}</p>
      </div>
      <div className="contact-row"><span>{rtl ? 'کسٹمر کیئر ای میل' : 'Customer Care Email'}</span><strong>customerservice@inyor.com</strong><Copy /></div>
      <div className="contact-row"><span>{rtl ? 'کسٹمر کیئر نمبر' : 'Customer Care Number'}</span><strong>0518123456 (8AM-8PM)</strong></div>
    </PhoneFrame>
  );
}

function CommonState({ rtl = false, type = 'network' }) {
  const map = {
    network: {
      icon: Wifi,
      title: rtl ? 'نیٹ ورک مسئلہ' : 'Network error',
      body: rtl ? 'ہم سرور سے رابطہ نہیں کر سکے۔ اپنا انٹرنیٹ چیک کریں اور دوبارہ کوشش کریں۔' : 'We could not connect to the server. Check your internet connection and try again.',
      action: rtl ? 'دوبارہ کوشش کریں' : 'Try again',
      secondary: rtl ? 'کسٹمر کیئر' : 'Contact support',
    },
    server: {
      icon: AlertTriangle,
      title: rtl ? 'سروس عارضی طور پر دستیاب نہیں' : 'Service temporarily unavailable',
      body: rtl ? 'ہم سسٹم بہتر بنا رہے ہیں۔ براہ کرم کچھ دیر بعد دوبارہ کوشش کریں۔' : 'We are improving the system. Please try again in a few minutes.',
      action: rtl ? 'دوبارہ کوشش کریں' : 'Retry',
      secondary: rtl ? 'بعد میں دیکھیں' : 'Check later',
    },
    session: {
      icon: LockKeyhole,
      title: rtl ? 'سیشن ختم ہو گیا' : 'Session expired',
      body: rtl ? 'آپ کی حفاظت کے لیے آپ کو لاگ آؤٹ کر دیا گیا ہے۔ جاری رکھنے کے لیے دوبارہ لاگ ان کریں۔' : 'For your security, you have been logged out. Please log in again to continue.',
      action: rtl ? 'دوبارہ لاگ ان کریں' : 'Log in again',
    },
    permission: {
      icon: Camera,
      title: rtl ? 'اجازت درکار ہے' : 'Permission required',
      body: rtl ? 'یہ مرحلہ مکمل کرنے کے لیے کیمرہ، مقام یا اطلاع کی اجازت درکار ہو سکتی ہے۔' : 'Camera, location, or notification permission may be required to complete this step.',
      action: rtl ? 'سیٹنگز کھولیں' : 'Open settings',
      secondary: rtl ? 'ابھی نہیں' : 'Not now',
    },
    empty: {
      icon: FileText,
      title: rtl ? 'کوئی ریکارڈ نہیں' : 'No records found',
      body: rtl ? 'ابھی دکھانے کے لیے کوئی معلومات موجود نہیں۔ نئی سرگرمی یہاں ظاہر ہو گی۔' : 'There is nothing to show yet. New activity will appear here.',
      action: rtl ? 'ہوم پر جائیں' : 'Back to Home',
    },
    success: {
      icon: ShieldCheck,
      title: rtl ? 'درخواست جمع ہو گئی' : 'Request submitted',
      body: rtl ? 'ہم نے آپ کی درخواست وصول کر لی ہے۔ اپ ڈیٹس کے لیے اطلاعات دیکھتے رہیں۔' : 'We have received your request. Watch notifications for updates.',
      action: rtl ? 'ٹھیک ہے' : 'Done',
    },
  };
  const item = map[type];
  const Icon = item.icon;
  return (
    <PhoneFrame title={rtl ? 'حالت' : 'Status'} rtl={rtl} noNav>
      <div className={`common-state ${type}`}>
        <div className="state-icon"><Icon /></div>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        <div className="state-actions">
          <Button>{item.action}</Button>
          {item.secondary && <Button variant="outline">{item.secondary}</Button>}
        </div>
      </div>
    </PhoneFrame>
  );
}

function FaceOutline() {
  return (
    <div className="face-outline">
      <span className="head" />
      <span className="shoulders" />
    </div>
  );
}

function FacialGuide({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? 'چہرے کی تصدیق' : 'Facial Verification'} noNav rtl={rtl} className="facial-phone">
      <div className="facial-stage">
        <div className="facial-instruction">
          <span><ScanFaceIcon /></span>
          <p>{rtl ? 'براہ کرم اپنا چہرہ شناختی باکس میں رکھیں' : 'Please put your face in the recognition box'}</p>
        </div>
        <div className="facial-guide-card">
          <div className="facial-guide-head">
            <span><Camera size={30} /></span>
            <h2>{rtl ? 'ہدایات پر عمل کریں' : 'Please follow the instructions'}</h2>
          </div>
          <div className="facial-guide-main">
            <div className="phone-selfie correct-face-box" aria-hidden="true">
              <CorrectFaceIcon />
            </div>
            <div className="facial-do">
              <h3><span><Check size={18} /></span>{rtl ? 'کریں' : 'Do'}</h3>
              <ul>
                <li>{rtl ? 'کیمرہ اپنے چہرے پر رکھیں' : 'Aim the camera at your face'}</li>
                <li>{rtl ? 'فرنٹ کیمرہ استعمال کریں' : 'Use the front camera'}</li>
              </ul>
            </div>
          </div>
          <div className="facial-divider" />
          <h3 className="facial-avoid-title"><span><X size={18} /></span>{rtl ? 'نہ کریں' : 'Avoid'}</h3>
          <div className="facial-donts avoid-grid">
            <div className="avoid-card">
              <div className="avoid-x">×</div>
              <LookUpIcon />
              <div className="avoid-label">Look up</div>
            </div>
            <div className="avoid-card">
              <div className="avoid-x">×</div>
              <LookDownIcon />
              <div className="avoid-label">Look down</div>
            </div>
            <div className="avoid-card">
              <div className="avoid-x">×</div>
              <WearMaskIcon />
              <div className="avoid-label">Wear mask</div>
            </div>
          </div>
          <Button icon={Camera}>{rtl ? 'چہرے کی تصدیق' : 'Facial Verification'}</Button>
        </div>
        <Button wide={false}>{rtl ? 'تصدیق شروع کریں' : 'Start Verification'}</Button>
      </div>
    </PhoneFrame>
  );
}

function CorrectFaceIcon() {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="218" height="168" rx="22" fill="#F4FBF8" stroke="#E5EEE9" />
      <path d="M38 50V28H68" stroke="#009B78" strokeWidth="4" strokeLinecap="round" />
      <path d="M182 50V28H152" stroke="#009B78" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 120V142H68" stroke="#009B78" strokeWidth="4" strokeLinecap="round" />
      <path d="M182 120V142H152" stroke="#009B78" strokeWidth="4" strokeLinecap="round" />

      <path d="M58 170C66 132 88 112 110 112C132 112 154 132 162 170H58Z" fill="#BFD8CC" />
      <path d="M93 104H127V137H93V104Z" fill="#F7F7F2" stroke="#34434A" strokeWidth="3" />

      <path d="M75 80C75 108 90 124 110 124C130 124 145 108 145 80C145 52 130 38 110 38C90 38 75 52 75 80Z" fill="#F7F7F2" stroke="#34434A" strokeWidth="3" />

      <path d="M73 83C62 81 59 97 70 103" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M147 83C158 81 161 97 150 103" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />

      <path d="M74 74C78 44 91 32 111 32C132 32 147 48 148 75C136 76 125 73 118 63C108 75 91 77 74 74Z" fill="#223039" />
    </svg>
  );
}

function LookUpIcon() {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29 51C31 35 41 25 55 24C68 23 76 32 75 44C74 55 66 62 55 64L52 74H34L36 61C31 60 28 56 29 51Z" fill="#F7F7F2" stroke="#34434A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M57 45C63 44 68 47 69 53" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 74H55" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 40C43 28 56 25 69 31C61 16 42 14 31 27C26 33 24 39 23 47C27 45 31 43 35 40Z" fill="#2D3D3F" />

      <path d="M80 67V42" stroke="#F05A5A" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 5" />
      <path d="M72 50L80 42L88 50" stroke="#F05A5A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LookDownIcon() {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 48C31 34 43 27 57 30C70 33 77 44 73 56C69 68 57 72 45 68L38 76L22 68L30 58C26 55 25 51 27 48Z" fill="#F7F7F2" stroke="#34434A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M55 53C61 55 65 59 65 65" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 72H45" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M31 39C45 25 65 28 76 43C77 31 67 19 52 18C38 18 28 27 24 39C27 39 29 39 31 39Z" fill="#2D3D3F" />

      <path d="M80 36V61" stroke="#F05A5A" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 5" />
      <path d="M72 53L80 61L88 53" stroke="#F05A5A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WearMaskIcon() {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 18C67 18 77 31 77 49C77 68 65 78 48 78C31 78 19 68 19 49C19 31 29 18 48 18Z" fill="#F7F7F2" stroke="#34434A" strokeWidth="3" />
      <path d="M24 51C13 47 14 34 24 34" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M72 51C83 47 82 34 72 34" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 46C38 52 58 52 70 46V61C58 69 38 69 26 61V46Z" fill="#BFD8CC" stroke="#34434A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 53H62" stroke="#8AA99B" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 59H60" stroke="#8AA99B" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 37C39 35 43 35 46 37" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 37C54 35 58 35 61 37" stroke="#34434A" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 23C37 13 58 11 69 26C59 22 47 23 39 29C36 26 33 24 30 23Z" fill="#2D3D3F" />
    </svg>
  );
}

function ScanFaceIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 12V8h4M20 8h4v4M24 20v4h-4M12 24H8v-4" />
      <rect x="11" y="11" width="10" height="10" rx="4" />
      <path d="M14 16h.01M18 16h.01M14.5 19c1 .8 2.2.8 3.2 0" />
    </svg>
  );
}

function GuideFace() {
  return (
    <div className="guide-face">
      <span className="guide-hair" />
      <span className="guide-ear left" />
      <span className="guide-ear right" />
      <span className="guide-head" />
      <span className="guide-neck" />
      <span className="guide-body" />
    </div>
  );
}

function MiniFace({ variant }) {
  if (variant === 'mask') {
    return (
      <svg className="mini-face mask" viewBox="0 0 72 64" aria-hidden="true">
        <path className="mini-neck-shape" d="M31 45h10v11H31z" />
        <path className="mini-ear-shape" d="M21 31c-4 1-5 7-1 10M51 31c4 1 5 7 1 10" />
        <path className="mini-head-shape front" d="M22 29c0-13 7-21 15-21s15 8 15 21c0 15-7 23-15 23S22 44 22 29z" />
        <path className="mini-hair-shape front" d="M21 28c0-15 11-24 25-18 7 3 9 12 5 18-10-2-17-7-30 0z" />
        <path className="mini-mask-shape" d="M22 32c8 6 21 6 30 0v12c-8 9-21 9-30 0z" />
      </svg>
    );
  }

  const isUp = variant === 'up';

  return (
    <svg className={`mini-face ${variant}`} viewBox="0 0 72 64" aria-hidden="true">
      <g className="mini-side-head" transform={`rotate(${isUp ? -25 : 25} 31 34)`}>
        <path className="mini-neck-shape" d="M26 45h10v11H25z" />
        <path className="mini-head-shape side" d="M20 35c0-13 7-22 18-22 8 0 14 5 14 13 0 3-1 6-3 8l7 5-8 2c-3 7-8 10-15 9-8-1-13-6-13-15z" />
        <path className="mini-hair-shape side" d="M19 33c0-15 12-25 26-19 6 3 7 10 2 13-11 2-15 8-28 6z" />
      </g>
      <path
        className="mini-arrow-line"
        d={isUp ? 'M56 48V18m0 0l-5 6m5-6l5 6' : 'M56 16v30m0 0l-5-6m5 6l5-6'}
      />
    </svg>
  );
}

function FacialScan({ rtl = false, recognitionFailed = false, photoReview = false }) {
  return (
    <PhoneFrame title={rtl ? 'چہرے کی تصدیق' : 'Facial Verification'} noNav rtl={rtl} className={`facial-phone scan ${recognitionFailed ? 'scan-failed' : ''} ${photoReview ? 'scan-review' : ''}`}>
      <div className="facial-stage">
        <p className="facial-instruction">
          {photoReview
            ? (rtl ? 'براہ کرم تصدیق کریں کہ تصویر واضح ہے' : 'Please confirm your face photo is clear')
            : (rtl ? 'براہ کرم اپنا چہرہ شناختی باکس میں رکھیں' : 'Please put your face in the recognition box')}
        </p>
        <div className="scan-ring">
          <FaceOutline />
          {recognitionFailed && (
            <div className="facial-scan-alert" role="alert">
              <AlertTriangle size={17} />
              <div>
                <strong>{rtl ? 'شناخت ناکام ہو گئی' : 'Recognition failed'}</strong>
                <small>{rtl ? 'براہ کرم دوبارہ کوشش کریں۔ آج آپ کے پاس 1 کوشش باقی ہے۔' : 'Please try again. You have 1 attempt left today.'}</small>
              </div>
            </div>
          )}
        </div>
        {photoReview ? (
          <div className="facial-review-actions">
            <button aria-label="Retake"><X size={18} /><span>{rtl ? 'دوبارہ لیں' : 'Retake'}</span></button>
            <button aria-label="Use photo"><Check size={18} /><span>{rtl ? 'تصویر استعمال کریں' : 'Use Photo'}</span></button>
          </div>
        ) : (
          <div className="scan-bottom"><Button wide={false}>{rtl ? 'تصدیق شروع کریں' : 'Start Verification'}</Button></div>
        )}
      </div>
    </PhoneFrame>
  );
}

function ApplicationStatus({ rtl = false, state = 'review' }) {
  const data = {
    review: {
      icon: Loader2,
      title: rtl ? 'درخواست زیر جائزہ ہے' : 'Application under review',
      body: rtl ? 'عام طور پر جائزہ 5 منٹ میں مکمل ہو جاتا ہے۔ کچھ کیسز میں 24 گھنٹے تک لگ سکتے ہیں۔ نتیجہ SMS کے ذریعے ملے گا۔' : 'Most reviews finish within 5 minutes. Some cases may take up to 24 hours. You will receive the result by SMS.',
      tone: 'review',
    },
    rejected: {
      icon: AlertTriangle,
      title: rtl ? 'درخواست منظور نہیں ہوئی' : 'We’re sorry, you do not meet our requirements at this time.',
      body: '',
      tone: 'rejected',
    },
    approved: {
      icon: Check,
      title: rtl ? 'منظور شدہ' : 'Approved',
      body: rtl ? 'منظور شدہ رقم: PKR 30,000' : 'Approved Amount: PKR 30,000',
      tone: 'approved',
    },
  }[state];
  const Icon = data.icon;
  return (
    <PhoneFrame title={rtl ? 'درخواست کی حیثیت' : 'Application Status'} rtl={rtl} noNav className="application-status-phone">
      <div className={`application-status ${data.tone}`}>
        <section className="status-hero-card">
          <div className="status-big-icon"><Icon /></div>
          <h2>{data.title}</h2>
          {data.body && <p>{data.body}</p>}
        </section>
        {state === 'review' && (
          <section className="status-copy">
            <div>
              <span><MessageCircle size={18} /></span>
              <h3>{rtl ? 'SMS اطلاع' : 'SMS Notification'}</h3>
              <p>{rtl ? 'زیادہ تر جائزے 5 منٹ میں مکمل ہو جاتے ہیں۔' : 'Most applications are reviewed within 5 minutes.'}</p>
              <p>{rtl ? 'کچھ کیسز میں 24 گھنٹے تک لگ سکتے ہیں۔' : 'Some cases may take up to 24 hours.'}</p>
            </div>
            <div>
              <span><Headphones size={18} /></span>
              <h3>{rtl ? 'مدد چاہیے؟' : 'Need help?'}</h3>
              <p>{rtl ? 'اگر 24 گھنٹے بعد SMS نہ ملے تو سپورٹ سے رابطہ کریں۔' : 'If no SMS arrives after 24 hours, please contact support.'}</p>
            </div>
          </section>
        )}
        {state === 'rejected' && <div className="status-bottom"><Button>{rtl ? 'ہوم پر واپس جائیں' : 'Back to Home'}</Button></div>}
        {state === 'approved' && <div className="status-bottom"><Button>{rtl ? 'رقم حاصل کریں' : 'Get Funds'}</Button></div>}
      </div>
    </PhoneFrame>
  );
}

function ReferenceHourglassIcon() {
  return (
    <svg className="reference-transfer-icon" viewBox="0 0 96 96" aria-hidden="true">
      <path className="hourglass-cap" d="M21 13h54" />
      <path className="hourglass-cap" d="M21 83h54" />
      <path className="hourglass-frame" d="M29 15c2 24 12 32 19 33-7 1-17 9-19 33" />
      <path className="hourglass-frame" d="M67 15c-2 24-12 32-19 33 7 1 17 9 19 33" />
      <path className="hourglass-sand" d="M38 35h20c-2 7-6 10-10 10s-8-3-10-10Z" />
      <path className="hourglass-sand" d="M36 69c3-12 8-16 12-16s9 4 12 16H36Z" />
    </svg>
  );
}

function ReferenceDeclinedIcon() {
  return (
    <div className="reference-declined-icon" aria-hidden="true">
      <X size={56} strokeWidth={6} />
    </div>
  );
}

function ReferenceActionButton({ children }) {
  return (
    <button className="reference-action-button" type="button">
      <span>{children}</span>
      <ChevronRight size={17} />
    </button>
  );
}

function TransferProcessingPage({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? 'درخواست کی حیثیت' : 'Application Status'} noNav rtl={rtl} className="funds-phone loan-review-phone">
      <div className="funds-result review-result">
        <section className="funds-hero review-hero">
          <div className="status-big-icon review"><Loader2 /></div>
          <span>{rtl ? 'قرض کی درخواست' : 'Loan Application'}</span>
          <h2>{rtl ? 'درخواست زیر جائزہ ہے' : 'Application Under Review'}</h2>
          <p>
            {rtl
              ? 'ہم آپ کی معلومات کی تصدیق کر رہے ہیں۔ نتیجہ مکمل ہوتے ہی SMS کے ذریعے بھیج دیا جائے گا۔'
              : 'We are verifying your information. You will receive the result by SMS once the review is complete.'}
          </p>
        </section>
        <section className="funds-detail review-detail">
          <div><span>{rtl ? 'قرض کی رقم' : 'Loan Amount'}</span><strong>PKR 3,000</strong></div>
          <div><span>{rtl ? 'درخواست نمبر' : 'Application ID'}</span><strong>INY-260127-67347</strong></div>
          <div><span>{rtl ? 'متوقع وقت' : 'Estimated Review Time'}</span><strong>{rtl ? '5 منٹ کے اندر' : 'Within 5 minutes'}</strong></div>
        </section>
        <section className="review-progress-card">
          <div className="active"><span><FileText size={17} /></span><strong>{rtl ? 'درخواست جمع ہو گئی' : 'Application submitted'}</strong></div>
          <div className="active"><span><Loader2 size={17} /></span><strong>{rtl ? 'کریڈٹ جائزہ جاری ہے' : 'Credit review in progress'}</strong></div>
          <div><span><WalletCards size={17} /></span><strong>{rtl ? 'منظوری کے بعد رقم حاصل کریں' : 'Get funds after approval'}</strong></div>
        </section>
        <ol className="review-notes">
          <li>{rtl ? 'زیادہ تر درخواستیں 5 منٹ کے اندر مکمل ہو جاتی ہیں۔' : 'Most applications are reviewed within 5 minutes.'}</li>
          <li>{rtl ? 'کچھ کیسز میں 24 گھنٹے تک لگ سکتے ہیں۔ براہ کرم دوبارہ درخواست جمع نہ کریں۔' : 'Some cases may take up to 24 hours. Please do not submit another application.'}</li>
        </ol>
        <div className="notification-card review-help-card">
          <Bell />
          <strong>{rtl ? 'آسان قرض کے لیے اطلاعات آن کریں' : 'Turn on notifications to get loans more easily'}</strong>
          <Button>{rtl ? 'مکمل کریں' : 'To Complete'}</Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function TransferFailedPage({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? 'درخواست کی حیثیت' : 'Application Status'} noNav rtl={rtl} className="reference-state-phone">
      <div className="reference-state transfer-failed">
        <section className="reference-state-hero compact">
          <div className="reference-status-orb declined"><ReferenceDeclinedIcon /></div>
          <span>{rtl ? 'درخواست کی حیثیت' : 'Application status'}</span>
          <h2>{rtl ? 'نامعلوم وجہ سے ناکام' : 'Failed for unknown reason'}</h2>
        </section>
        <section className="reference-detail-box">
          <div><span>{rtl ? 'رقم:' : 'Amount:'}</span><strong>PKR 3,000</strong></div>
          <div><span>{rtl ? 'والٹ:' : 'Wallet:'}</span><strong>Easypaisa</strong></div>
          <div><span>{rtl ? 'موبائل نمبر:' : 'Mobile Number:'}</span><strong>****67347</strong></div>
        </section>
        <section className="reference-alert-card failed">
          <span><AlertTriangle size={19} /></span>
          <p>{rtl ? 'ناکامی کی وجہ نامعلوم ہے۔ براہ کرم مدد کے لیے کسٹمر سروس سے رابطہ کریں۔' : 'The failure reason is unknown. Please contact customer service for help.'}</p>
        </section>
        <div className="reference-bottom-action">
          <button className="reference-action-button support" type="button">
            <Headphones size={18} />
            <span>{rtl ? 'کسٹمر سروس سے رابطہ کریں' : 'Contact Customer Service'}</span>
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ApplicationDeclinedReferencePage({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? 'درخواست کی حیثیت' : 'Application Status'} noNav rtl={rtl} className="reference-state-phone">
      <div className="reference-state declined">
        <section className="reference-single-notice declined">
          <div className="reference-status-orb declined"><ReferenceDeclinedIcon /></div>
          <h2>{rtl ? 'درخواست مسترد ہو گئی' : 'Application declined'}</h2>
          <p>{rtl ? 'معذرت، آپ اس وقت ہماری شرائط پر پورا نہیں اترتے۔' : 'We’re sorry, you do not meet our requirements at this time.'}</p>
        </section>
        <div className="reference-bottom-action">
          <ReferenceActionButton>{rtl ? 'ہوم پر واپس جائیں' : 'Back to Home'}</ReferenceActionButton>
        </div>
      </div>
    </PhoneFrame>
  );
}

function LoanSummary({ rtl = false, expired = false }) {
  const [showLateFeeInfo, setShowLateFeeInfo] = React.useState(false);
  const [showWalletUnavailable, setShowWalletUnavailable] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(expired ? 0 : 1 * 60 * 60 + 50 * 60 + 40);
  React.useEffect(() => {
    if (expired) return undefined;
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [expired]);
  const timeLeft = [
    Math.floor(secondsLeft / 3600),
    Math.floor((secondsLeft % 3600) / 60),
    secondsLeft % 60,
  ].map((value) => String(value).padStart(2, '0')).join(':');
  const rows = [
    { label: rtl ? 'کوپن لاگو' : 'Coupon Applied', value: '-PKR 200', couponLink: true },
    { label: rtl ? 'مارک اپ' : 'Markup', value: 'PKR 1035' },
    { label: rtl ? 'سروس فیس' : 'Service Fee', value: 'PKR 115' },
    { label: rtl ? 'ادائیگی کی تاریخ' : 'Disbursement Date', value: '27 Jan 2026' },
    { label: rtl ? 'کل ادائیگی' : 'Total Repayment', value: 'PKR 7150' },
    { label: rtl ? 'روزانہ شرح' : 'Daily Rate', value: '0.75%' },
    { label: rtl ? 'تاخیر فیس' : 'Late Fee', value: rtl ? '2.3% روزانہ' : '2.3% per day', lateFee: true },
    { label: rtl ? 'APR' : 'APR', value: '273%' },
  ];
  return (
    <PhoneFrame title={rtl ? 'قرض کا خلاصہ' : 'Loan Summary'} rtl={rtl} noNav className="loan-summary-phone">
      <section className="matched-plan-card">
        <div className="matched-plan-head">
          <span><ShieldCheck size={18} /></span>
          <div>
            <strong>{rtl ? 'آپ کا قرض منصوبہ' : 'Your loan plan'}</strong>
          </div>
          <small><Check size={14} />{rtl ? 'تصدیق شدہ' : 'Confirmed'}</small>
        </div>
        <div className="matched-plan-amount">
          <em>{rtl ? 'قرض کی رقم' : 'Loan Amount'}</em>
          <strong>PKR 5,000</strong>
        </div>
        <div className="matched-plan-term">
          <em>{rtl ? 'مدت' : 'Term'}</em>
          <strong>{rtl ? '2 اقساط · 30 دن' : '2 installments · 30 days'}</strong>
        </div>
      </section>
      <div className="loan-summary-banner">
        <Gift />
        <strong>{rtl ? 'اگلا قرض' : 'Next Loan'}</strong>
        <span>+15000</span>
        <span>+25000</span>
        <span>+50000</span>
      </div>
      <section className="summary-card">
        <h3>{rtl ? 'قرض کی تفصیلات' : 'Loan Details'}</h3>
        {rows.map((row) => (
          <div key={row.label}>
            <span className="summary-label">
              {row.label}
              {row.lateFee && (
                <button
                  className="fee-info-button"
                  type="button"
                  aria-label={rtl ? 'تاخیر فیس کی وضاحت' : 'Late fee explanation'}
                  onClick={() => setShowLateFeeInfo(true)}
                >
                  <Info size={14} />
                </button>
              )}
            </span>
            <strong>{row.value}{row.couponLink && (rtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />)}</strong>
          </div>
        ))}
      </section>
      <section className="summary-card">
        <h3>{rtl ? 'ادائیگی کا شیڈول' : 'Repayment Schedule'}</h3>
        <div><span>{rtl ? 'پہلی قسط کی تاریخ' : '1st Installment Date'}</span><strong>14-Feb-2026</strong></div>
        <div><span>{rtl ? 'پہلی قسط کی رقم' : '1st Installment Amount'}</span><strong>PKR 3,575</strong></div>
        <div><span>{rtl ? 'دوسری قسط کی تاریخ' : '2nd Installment Date'}</span><strong>1-Mar-2026</strong></div>
        <div><span>{rtl ? 'دوسری قسط کی رقم' : '2nd Installment Amount'}</span><strong>PKR 3,575</strong></div>
      </section>
      <section className="summary-card">
        <div><span>{rtl ? 'موبائل والٹ' : 'Mobile Wallet'}</span><strong>****67347 <ChevronRight size={16} /></strong></div>
      </section>
      <section className="summary-card">
        <div><span>{rtl ? 'کولنگ آف مدت' : 'Cooling off Period'}</span><strong>24H</strong></div>
        <p>{rtl ? 'اگر آپ کولنگ آف مدت میں ادائیگی کرتے ہیں تو صرف CIB، NADRA اور فنڈ ٹرانسفر لاگت وصول ہوگی۔' : "You will only be charged for CIB,NADRA and fund's transfer cost if you repay within cooling off period."}</p>
      </section>
      <section className="summary-card">
        <h3>{rtl ? 'ہم سے رابطہ کریں' : 'Contact us'}</h3>
        <p>{rtl ? 'کسٹمر سپورٹ:support@inyor.pk' : 'Customer Support:support@inyor.pk'}</p>
        <p>{rtl ? 'کسٹمر سروس:051-222-444-666' : 'Customer service: 051-222-444-666'}</p>
        <p>{rtl ? 'پتہ:Apartment #3, 3rd Floor' : 'Address: Apartment #3, 3rd Floor'}</p>
      </section>
      <div className="loan-summary-sticky">
        {secondsLeft > 0 ? (
          <span>{rtl ? `باقی وقت ${timeLeft}` : `Time Left ${timeLeft}`}</span>
        ) : (
          <span className="expiry-warning">Your loan information is about to expire. Please apply as soon as possible.</span>
        )}
        <label><input type="checkbox" defaultChecked /> {rtl ? 'میں نے پڑھ لیا اور اتفاق کرتا ہوں' : 'I have read and agree to the'} <button>{rtl ? 'قرض معاہدہ' : 'Loan Agreement'}</button></label>
        <Button type="button" onClick={() => setShowWalletUnavailable(true)}>{rtl ? 'قبول کریں اور رقم حاصل کریں' : 'Accept & Get Funds'}</Button>
        <button>{rtl ? 'انکار' : 'Decline'}</button>
      </div>
      {showWalletUnavailable && (
        <WalletUnavailableDialog
          rtl={rtl}
          onClose={() => setShowWalletUnavailable(false)}
          onModify={() => setShowWalletUnavailable(false)}
        />
      )}
      {showLateFeeInfo && (
        <div
          className="loan-info-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="late-fee-title"
          onClick={() => setShowLateFeeInfo(false)}
        >
          <div className="loan-info-modal" onClick={(event) => event.stopPropagation()}>
            <h3 id="late-fee-title">Late Payment Fee</h3>
            <p>If you borrow PKR 5,000, the late fee will be PKR 115 per day.</p>
            <p>No late fee will be charged if you repay on time.</p>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}

const phase3Order = {
  total: '14,628',
  outstanding: '10,900',
  fullOutstanding: '14,628',
  markup: '3,928.5',
  coupon: '300',
  terms: '4 installments · 60 days',
  date: '1 Jan 2026',
  service: '436.5',
};

const phase3Installments = [
  { title: '1st Installment', amount: '3,728', due: '16 Jan 2026', repayDate: '20 Jan 2026', late: '211.02', status: 'Paid' },
  { title: '2nd Installment', amount: '3,868', due: '31 Jan 2026', late: '1,251.6', status: '20 Days Overdue' },
  { title: '3rd Installment', amount: '3,516', due: '15 Feb 2026', late: '351.6', status: '5 Days Overdue' },
  { title: '4th Installment', amount: '3,516', due: '2 Mar 2026', late: '0', status: 'Upcoming' },
];

const phase3Urdu = {
  progress: 'جاری',
  history: 'ہسٹری',
  repayment: 'ادائیگی',
  totalPayable: 'کل قابل ادائیگی',
  outstanding: 'بقایا رقم',
  disbursement: 'اجرا کی تاریخ',
  details: 'آرڈر کی تفصیلات',
  installmentRepayment: 'قسط کی ادائیگی',
  total: 'کل',
  dueMsg: (date) => `آپ کی ادائیگی ${date} کو واجب الادا ہے۔ براہ کرم وقت پر ادا کریں۔`,
  overdueMsg: (days) => `آپ ${days} دن تاخیر سے ہیں۔ براہ کرم جلد از جلد ادائیگی کریں۔`,
  amountDue: 'اس مدت کی رقم',
  paidUp: 'ادا شدہ رقم',
  dueDate: 'واجب الادا تاریخ',
  lateFee: 'تاخیر فیس',
  repayNow: 'ابھی ادا کریں',
  howToPay: 'ادائیگی کا طریقہ',
  other: 'دیگر اقساط',
  upcoming: 'آنے والی',
  paid: 'ادا شدہ',
  daysOverdue: (days) => `${days} دن تاخیر`,
  markup: 'مارک اپ',
  couponApplied: 'کوپن لاگو',
  terms: 'مدت',
  service: 'سروس فیس',
  agreement: 'قرض معاہدہ دیکھیں',
  plan: 'ادائیگی پلان',
  unpaid: 'غیر ادا شدہ اقساط',
  repaymentAmount: 'ادائیگی رقم',
  repaymentDate: 'ادائیگی تاریخ',
  settleNow: 'ابھی مکمل ادا کریں',
  earlySettlement: 'قبل از وقت ادائیگی',
  noData: 'کوئی ڈیٹا نہیں',
  getFunds: 'رقم حاصل کریں',
  completedDate: 'مکمل ہونے کی تاریخ',
  paidOff: 'مکمل ادا',
  paymentAmount: 'ادائیگی رقم',
  coupon: 'کوپن',
  available: '1 دستیاب',
  orderNumber: 'آرڈر نمبر',
  billerName: 'بلر نام',
  phoneNumber: 'فون نمبر',
  selectWallet: 'براہ کرم ادائیگی کے لیے والٹ منتخب کریں۔',
  customerId: 'کسٹمر آئی ڈی',
  payWith: (name) => `${name} سے ادائیگی کیسے کریں؟`,
  success: 'ادائیگی کامیاب',
  term: 'قسط',
  titleOrder: 'آرڈر کی تفصیلات',
};

const phase3InstallmentTitle = (title, rtl = false) => {
  if (!rtl) return title;
  return title
    .replace('1st Installment', 'پہلی قسط')
    .replace('2nd Installment', 'دوسری قسط')
    .replace('3rd Installment', 'تیسری قسط')
    .replace('4th Installment', 'چوتھی قسط');
};

const phase3StatusLabel = (status, rtl = false) => {
  if (!rtl) return status;
  if (status === 'Paid') return phase3Urdu.paid;
  if (status === 'Upcoming') return phase3Urdu.upcoming;
  if (status.includes('20')) return phase3Urdu.daysOverdue(20);
  if (status.includes('5')) return phase3Urdu.daysOverdue(5);
  return status;
};

function Phase3Date({ children }) {
  return <span className="phase3-date" dir="ltr">{children}</span>;
}

function Phase3Tabs({ active = 'progress', rtl = false }) {
  return (
    <div className="phase3-tabs">
      <button className={active === 'progress' ? 'active' : ''}>{rtl ? phase3Urdu.progress : 'In Progress'}</button>
      <button className={active === 'history' ? 'active' : ''}>{rtl ? phase3Urdu.history : 'History'}</button>
    </div>
  );
}

function Phase3AmountSummary({ outstanding = phase3Order.outstanding, showDate = true, rtl = false }) {
  return (
    <section className="phase3-summary">
      <h2>{rtl ? phase3Urdu.repayment : 'Repayment'}</h2>
      <div className="phase3-metrics">
        <div>
          <span>{rtl ? phase3Urdu.totalPayable : 'Total Payable'}</span>
          <strong>PKR {phase3Order.total}</strong>
        </div>
        <div>
          <span>{rtl ? phase3Urdu.outstanding : 'Outstanding Amount'}</span>
          <strong>PKR {outstanding}</strong>
        </div>
      </div>
      <div className="phase3-summary-foot">
        {showDate && <span>{rtl ? phase3Urdu.disbursement : 'Disbursement Date'}<br /><strong><Phase3Date>{phase3Order.date}</Phase3Date></strong></span>}
        <button>{rtl ? phase3Urdu.details : 'Order details'} {rtl ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}</button>
      </div>
    </section>
  );
}

function Phase3Reminder({ tone = 'overdue', days = 5, date = '31 Jan 2026', rtl = false }) {
  const text = tone === 'due'
    ? (rtl ? phase3Urdu.dueMsg(date) : `Your repayment is due on ${date}. Please repay on time.`)
    : (rtl ? phase3Urdu.overdueMsg(days) : `You are ${days} days overdue. Please repay as soon as possible.`);
  return (
    <div className={`phase3-reminder ${tone}`}>
      <Bell size={26} fill="currentColor" />
      <p>{text}</p>
    </div>
  );
}

function Phase3KeyRows({ amount = '3,868', due = '31 Jan 2026', late = '351.6', rtl = false }) {
  const showLateFee = late !== '0';
  return (
    <div className="phase3-keyrows">
      <div><span>{rtl ? phase3Urdu.amountDue : 'Amount due this period'}</span><strong>PKR {amount}</strong></div>
      <div><span>{rtl ? phase3Urdu.paidUp : 'Paid-up Amount'}</span><strong>0</strong></div>
      <div><span>{rtl ? phase3Urdu.dueDate : 'Due Date'}</span><strong><Phase3Date>{due}</Phase3Date></strong></div>
      {showLateFee && <div><span>{rtl ? phase3Urdu.lateFee : 'Late Fee'}</span><strong>{late}</strong></div>}
    </div>
  );
}

function Phase3Repayment({ mode = 'singleOverdue', rtl = false }) {
  const isBeforeDue = mode === 'beforeDue';
  const isMulti = mode === 'multiOverdue';
  const currentDays = mode === 'twentyDays' || isMulti ? 20 : 5;
  return (
    <PhoneFrame tab="repay" rtl={rtl} className="phase3-phone phase3-repay-phone">
      <Phase3Tabs rtl={rtl} />
      <Phase3AmountSummary rtl={rtl} outstanding={isBeforeDue ? phase3Order.fullOutstanding : phase3Order.outstanding} showDate={mode !== 'compact'} />
      <section className="phase3-section">
        <h2>{rtl ? phase3Urdu.installmentRepayment : 'Installment Repayment'}</h2>
        <h3>{phase3InstallmentTitle(isBeforeDue ? '1st Installment' : '2nd Installment', rtl)} / 4 {rtl ? phase3Urdu.total : 'Total'}</h3>
        <Phase3Reminder rtl={rtl} tone={isBeforeDue ? 'due' : 'overdue'} days={currentDays} />
        <Phase3KeyRows rtl={rtl} late={isBeforeDue ? '0' : '351.6'} />
        {!isBeforeDue && (
          <div className="phase3-actions">
            <Button>{rtl ? phase3Urdu.repayNow : 'Repay Now'}</Button>
            <Button variant="outline">{rtl ? phase3Urdu.howToPay : 'How to Pay'}</Button>
          </div>
        )}
      </section>
      {isMulti && (
        <section className="phase3-section compact-due">
          <h3>{phase3InstallmentTitle('3rd Installment', rtl)} / 4 {rtl ? phase3Urdu.total : 'Total'}</h3>
          <Phase3Reminder rtl={rtl} days={5} />
          <Phase3KeyRows rtl={rtl} amount="3,868" due="15 Feb 2026" late="79" />
          <div className="phase3-actions">
            <Button>{rtl ? phase3Urdu.repayNow : 'Repay Now'}</Button>
            <Button variant="outline">{rtl ? phase3Urdu.howToPay : 'How to Pay'}</Button>
          </div>
        </section>
      )}
      <section className="phase3-section other">
        <h2>{rtl ? phase3Urdu.other : 'Other Installments'}</h2>
        {(isBeforeDue ? phase3Installments.slice(1) : phase3Installments.slice(isMulti ? 3 : 2)).map((item, index) => (
          <details className="phase3-other-row" key={item.title} open={index === 0}>
            <summary>
              <span>{phase3InstallmentTitle(item.title, rtl)}</span>
              <strong>{rtl ? phase3Urdu.upcoming : 'Upcoming'}</strong>
              <ChevronDown size={17} />
            </summary>
            <div className="phase3-other-detail">
              <div><span>{rtl ? phase3Urdu.repaymentAmount : 'Repayment Amount'}</span><strong>PKR {item.amount}</strong></div>
              <div><span>{rtl ? phase3Urdu.dueDate : 'Due Date'}</span><strong><Phase3Date>{item.due}</Phase3Date></strong></div>
              {item.late !== '0' && <div><span>{rtl ? phase3Urdu.lateFee : 'Late Fee'}</span><strong>{item.late}</strong></div>}
            </div>
          </details>
        ))}
      </section>
    </PhoneFrame>
  );
}

function Phase3OrderDetails({ state = 'upcoming', rtl = false }) {
  const overdue = state === 'overdue';
  const cool = state === 'cooling';
  const lateFee = overdue ? '562.62' : '0';
  const outstanding = overdue ? phase3Order.outstanding : phase3Order.fullOutstanding;
  const items = overdue ? phase3Installments : phase3Installments.map((item) => ({ ...item, late: '0', status: 'Upcoming' }));
  return (
    <PhoneFrame title={rtl ? phase3Urdu.titleOrder : 'Order details'} tab="repay" rtl={rtl} className="phase3-phone phase3-order-phone">
      <section className="phase3-order-head">
        <div><span>{rtl ? phase3Urdu.totalPayable : 'Total Payable'}</span><strong>PKR {phase3Order.total}</strong></div>
        <div><span>{rtl ? phase3Urdu.outstanding : 'Outstanding Amount'}</span><strong>PKR {outstanding}</strong></div>
      </section>
      <section className="phase3-detail-list">
        <div><span>{rtl ? phase3Urdu.markup : 'Markup'}</span><strong>{phase3Order.markup}</strong></div>
        <div><span>{rtl ? phase3Urdu.couponApplied : 'Coupon Applied'}</span><strong>{phase3Order.coupon}</strong></div>
        <div><span>{rtl ? phase3Urdu.terms : 'Terms'}</span><strong>{rtl ? '4 اقساط · 60 دن' : phase3Order.terms}</strong></div>
        <div><span>{rtl ? phase3Urdu.disbursement : 'Disbursement Date'}</span><strong><Phase3Date>{phase3Order.date}</Phase3Date></strong></div>
        <div><span>{rtl ? phase3Urdu.service : 'Service Fee'}</span><strong>{phase3Order.service}</strong></div>
        {lateFee !== '0' && <div><span>{rtl ? phase3Urdu.lateFee : 'Late Fee'}</span><strong>{lateFee}</strong></div>}
        <button>{rtl ? phase3Urdu.agreement : 'View Loan Agreement'} {rtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}</button>
      </section>
      <section className="phase3-plan">
        <h2>{rtl ? phase3Urdu.plan : 'Repayment Plan'}</h2>
        <p>{overdue ? '3' : '4'} {rtl ? phase3Urdu.unpaid : 'Unpaid Installments'}</p>
        {items.map((item, index) => (
          <article className="phase3-installment-card" key={item.title}>
            <div className="phase3-installment-top">
              <h3>{phase3InstallmentTitle(item.title, rtl)}</h3>
              <span className={item.status.includes('Overdue') ? 'danger' : item.status === 'Paid' ? 'paid' : ''}>{phase3StatusLabel(item.status, rtl)}</span>
            </div>
            <div><span>{rtl ? phase3Urdu.repaymentAmount : 'Repayment Amount'}</span><strong>PKR {item.amount}</strong></div>
            <div><span>{rtl ? phase3Urdu.dueDate : 'Due Date'}</span><strong><Phase3Date>{item.due}</Phase3Date></strong></div>
            {item.repayDate && <div><span>{rtl ? phase3Urdu.repaymentDate : 'Repayment Date'}</span><strong><Phase3Date>{item.repayDate}</Phase3Date></strong></div>}
            {item.late !== '0' && <div><span>{rtl ? phase3Urdu.lateFee : 'Late Fee'}</span><strong>{item.late}</strong></div>}
          </article>
        ))}
      </section>
      {!cool && (
        <div className="phase3-bottom-actions">
          <Button>{overdue ? (rtl ? phase3Urdu.settleNow : 'Settle Now') : (rtl ? phase3Urdu.earlySettlement : 'Early Settlement')}</Button>
          <Button variant="outline">{rtl ? phase3Urdu.howToPay : 'How to Pay'}</Button>
        </div>
      )}
    </PhoneFrame>
  );
}

function Phase3History({ rtl = false }) {
  return (
    <PhoneFrame tab="repay" rtl={rtl} className="phase3-phone phase3-history-phone">
      <Phase3Tabs active="history" rtl={rtl} />
      <section className="phase3-history-card">
        <div><span>{rtl ? phase3Urdu.paidOff : 'Paid Off'}</span><strong>PKR {phase3Order.total}</strong></div>
        <div><span>{rtl ? phase3Urdu.disbursement : 'Disbursement Date'}</span><strong><Phase3Date>{phase3Order.date}</Phase3Date></strong></div>
        <div><span>{rtl ? phase3Urdu.completedDate : 'Completed Date'}</span><strong><Phase3Date>5 Mar 2026</Phase3Date></strong></div>
      </section>
    </PhoneFrame>
  );
}

function Phase3Empty({ rtl = false }) {
  return (
    <PhoneFrame tab="repay" rtl={rtl} className="phase3-phone phase3-empty-phone">
      <Phase3Tabs rtl={rtl} />
      <div className="phase3-empty">
        <div className="phase3-empty-icon"><FileText size={74} /></div>
        <h2>{rtl ? phase3Urdu.noData : 'No Data'}</h2>
        <Button wide={false}>{rtl ? phase3Urdu.getFunds : 'Get Funds'}</Button>
      </div>
    </PhoneFrame>
  );
}

function Phase3WalletRow({ wallet = 'easypaisa', open = false, rtl = false }) {
  const logo = wallet === 'easypaisa' ? walletLogos.easypaisa : walletLogos.jazzcash;
  const label = wallet === 'easypaisa' ? 'Easypaisa' : 'JazzCash';
  return (
    <section className={`phase3-wallet ${open ? 'open' : ''}`}>
      <img src={logo} alt={`${label} logo`} />
      <div>
        <strong>{rtl ? phase3Urdu.customerId : 'Customer ID'}</strong>
        <span>1243325435466</span>
      </div>
      <button aria-label={`Copy ${label} customer ID`}><Copy size={25} /></button>
      <h3>{rtl ? phase3Urdu.payWith(label) : `How to pay with ${label}?`} <ChevronDown size={22} /></h3>
      {open && (
        <ol>
          <li>{rtl ? 'کسٹمر آئی ڈی کاپی کریں۔' : 'Copy the customer ID.'}</li>
          <li>{rtl ? 'اپنی والٹ ایپ کھولیں اور بل پیمنٹ منتخب کریں۔' : 'Open your wallet app and choose bill payment.'}</li>
          <li>{rtl ? 'آئی ڈی پیسٹ کریں اور رقم کنفرم کریں۔' : 'Paste the ID and confirm the amount.'}</li>
        </ol>
      )}
    </section>
  );
}

function Phase3Payment({ coupon = 'available', open = null, rtl = false }) {
  return (
    <PhoneFrame title={rtl ? phase3Urdu.repayment : 'repay'} tab="repay" rtl={rtl} className="phase3-phone phase3-payment-phone">
      <section className="phase3-payment-summary">
        <span>{rtl ? phase3Urdu.paymentAmount : 'Repayment Amount'}</span>
        <strong>PKR 2,225</strong>
        {coupon === 'none' && <div><span>{rtl ? phase3Urdu.dueDate : 'Due Date'}</span><strong><Phase3Date>19 Mar 2026</Phase3Date></strong></div>}
        {coupon === 'applied' && <div><span>{rtl ? phase3Urdu.coupon : 'Coupon'}</span><strong>-300</strong></div>}
        {coupon === 'available' && <button><span>{rtl ? phase3Urdu.coupon : 'Coupon'}</span><strong>{rtl ? phase3Urdu.available : '1 Available'} {rtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}</strong></button>}
        <div><span>{rtl ? phase3Urdu.orderNumber : 'Order number'}</span><strong>1243243254</strong></div>
        <div><span>{rtl ? phase3Urdu.billerName : 'Biller name'}</span><strong>jack lee</strong></div>
        <div><span>{rtl ? phase3Urdu.phoneNumber : 'Phone number'}</span><strong>9234567367842</strong></div>
      </section>
      <h2 className="phase3-wallet-title">{rtl ? phase3Urdu.selectWallet : 'Please select a wallet for payment.'}</h2>
      <Phase3WalletRow rtl={rtl} wallet="easypaisa" open={open === 'easypaisa'} />
      <Phase3WalletRow rtl={rtl} wallet="jazzcash" open={open === 'jazzcash'} />
    </PhoneFrame>
  );
}

function Phase3PaymentSuccess({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? phase3Urdu.repayment : 'repay'} tab="repay" rtl={rtl} className="phase3-phone phase3-success-phone">
      <section className="phase3-success">
        <div className="phase3-success-icon"><WalletCards size={70} /><Check size={30} /></div>
        <h2>{rtl ? phase3Urdu.success : 'Repayment Successful'}</h2>
        <strong>PKR 2,225</strong>
      </section>
      <section className="phase3-success-detail">
        <div><span>{rtl ? phase3Urdu.orderNumber : 'Order number'}</span><strong>1243243254</strong></div>
        <div><span>{rtl ? phase3Urdu.repaymentDate : 'Repayment Date'}</span><strong><Phase3Date>19 Mar 2026</Phase3Date></strong></div>
        <div><span>{rtl ? phase3Urdu.term : 'Term'}</span><strong>{phase3InstallmentTitle('1st Installment', rtl)}</strong></div>
      </section>
    </PhoneFrame>
  );
}

function FundsDisbursed({ rtl = false }) {
  return (
    <PhoneFrame title={rtl ? 'فنڈز کی حیثیت' : 'Funds Status'} noNav rtl={rtl} className="funds-phone">
      <div className="funds-result">
        <section className="funds-hero">
          <div className="status-big-icon approved"><Check /></div>
          <h2>{rtl ? 'رقم بھیج دی گئی' : 'Funds Disbursed'}</h2>
          <p>{rtl ? 'آپ کی رقم کامیابی سے موبائل والٹ میں بھیج دی گئی ہے۔' : 'Your funds have been successfully sent to your mobile wallet.'}</p>
        </section>
        <section className="funds-detail">
          <div><span>Amount</span><strong>PKR 3,000</strong></div>
          <div><span>Wallet</span><strong>EasyPaisa</strong></div>
          <div><span>Mobile Number</span><strong>****67347</strong></div>
        </section>
        <ol>
          <li>{rtl ? 'اگر آپ کو رقم موصول نہیں ہوئی تو براہ کرم ہم سے رابطہ کریں۔' : 'If you have not received the payment, please contact us.'}</li>
          <li>{rtl ? 'اگر قرض ناکام ہو جائے تو اپنے اکاؤنٹ کی معلومات کی تصدیق کرکے درخواست دوبارہ جمع کریں۔' : 'If the loan fails, please confirm your account information and resubmit the application. We will give priority to your next request.'}</li>
        </ol>
        <div className="notification-card">
          <Bell />
          <strong>{rtl ? 'آسان قرض کے لیے اطلاعات آن کریں' : 'Turn on notifications to get loans more easily'}</strong>
          <Button>{rtl ? 'مکمل کریں' : 'To Complete'}</Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function SatisfactionDialog({ timeout = false }) {
  const [rating, setRating] = React.useState(0);
  const needsFeedback = rating > 0 && rating < 5;
  const shouldRateGoogle = rating === 5;

  return (
    <div className="satisfaction-board">
      <div className="satisfaction-modal">
        <div className={`satisfaction-icon ${timeout ? 'timeout' : 'happy'}`}>
          {timeout ? <RefreshCcw /> : <Star />}
        </div>
        {timeout ? (
          <>
            <p>Your operation has timed out. Please refresh the page.</p>
            <div className="satisfaction-actions">
              <Button wide={false}>Satisfied</Button>
              <Button variant="outline" wide={false}>Not Satisfied</Button>
            </div>
          </>
        ) : (
          <>
            <p>Are you satisfied with us?</p>
            <div className="star-rating interactive" aria-label="Select rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" aria-label={`${n} star`} key={n} onClick={() => setRating(n)}>
                  <Star className={n <= rating ? 'filled' : ''} />
                </button>
              ))}
            </div>
            {needsFeedback && (
              <>
                <textarea placeholder="Tell us what we can do better" />
                <div className="satisfaction-actions">
                  <Button wide={false}>Submit Feedback</Button>
                </div>
              </>
            )}
            {shouldRateGoogle && (
              <>
                <div className="google-review-card">
                  <strong>Thanks for your rating</strong>
                  <span>Share your experience on Google Play.</span>
                </div>
                <div className="satisfaction-actions">
                  <Button wide={false}>Rate on Google Play</Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ApplicationExitDialog() {
  return (
    <div className="retention-board">
      <div className="retention-modal">
        <div className="retention-icon"><ShieldCheck /></div>
        <h3>Leave application?</h3>
        <p>You are about to get a credit limit of up to PKR 50,000.</p>
        <div className="retention-benefits">
          <span><Check size={15} /> Takes about 2 minutes</span>
          <span><Check size={15} /> Secure data protection</span>
          <span><Check size={15} /> Faster review after completion</span>
        </div>
        <div className="retention-actions">
          <Button wide={false}>Continue Application</Button>
          <Button variant="outline" wide={false} className="retention-home-link">Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

function BestLoanPlanDialog() {
  return (
    <div className="best-plan-board">
      <div className="best-plan-modal">
        <div className="best-plan-icon"><ShieldCheck /></div>
        <h3>Best loan plan matched for you</h3>
        <div className="best-plan-details">
          <div><span>Loan Amount</span><strong>PKR 5,000</strong></div>
          <div><span>Loan Term</span><strong>2 installments · 30 days</strong></div>
        </div>
        <p>Tap Apply Now to continue, or return to Home to review later.</p>
        <div className="best-plan-actions">
          <Button variant="outline" wide={false}>Back Home</Button>
          <Button wide={false}>Apply Now</Button>
        </div>
      </div>
    </div>
  );
}

function DialogStates() {
  return (
    <div className="dialog-board">
      <div className="modal"><Check /><strong>Application submitted</strong><p>We will notify you after review.</p><Button wide={false}>Done</Button></div>
      <div className="modal"><AlertTriangle /><strong>Permission required</strong><p>Please allow camera access to verify CNIC.</p><Button wide={false}>Open Settings</Button></div>
      <div className="toast success"><Check size={16} />OTP verified successfully</div>
      <div className="toast error"><X size={16} />Network error. Please try again.</div>
      <div className="system-permission"><Bell /><p>Allow Inyor to send notifications?</p><div><button>Don't allow</button><button>Allow</button></div></div>
      <div className="modal danger-modal"><Trash2 /><strong>Delete account?</strong><p>This action cannot be undone. Make sure all dues are settled before continuing.</p><div className="modal-actions"><Button variant="outline" wide={false}>Keep Account</Button><Button variant="danger" wide={false}>Delete</Button></div></div>
    </div>
  );
}

const screenPairs = [
  ['First open / Splash', () => <Splash />],
  ['First open / Risk notice', () => <RiskNotice />],
  ['First open / Permissions', (rtl) => <PermissionConsent rtl={rtl} />],
  ['First open / Privacy Policy', (rtl) => <TermsDetail rtl={rtl} type="privacy" />],
  ['First open / Terms and Conditions', (rtl) => <TermsDetail rtl={rtl} type="terms" />],
  ['First open / User Data Policy', (rtl) => <TermsDetail rtl={rtl} type="data" />],
  ['Home Page Copy', (rtl) => <HomePage rtl={rtl} />],
  ['Home / Application under review', (rtl) => <HomePage rtl={rtl} state="review" />],
  ['Home / Reapply after 7 days', (rtl) => <HomePage rtl={rtl} state="rejectedRetry" />],
  ['Home / Not eligible', (rtl) => <HomePage rtl={rtl} state="rejectedFinal" />],
  ['Home / Choose amount', (rtl) => <HomePage rtl={rtl} state="choose" />],
  ['Home / 15 days remaining', (rtl) => <HomePage rtl={rtl} state="remaining" />],
  ['Home / Repayment due soon', (rtl) => <HomePage rtl={rtl} state="dueSoon" />],
  ['Home / Repayment overdue', (rtl) => <HomePage rtl={rtl} state="overdue" />],
  ['Home / Multiple bills overdue', (rtl) => <HomePage rtl={rtl} state="multipleOverdue" />],
  ['Home / Cooling-off cancellation limit', (rtl) => <HomePage rtl={rtl} state="coolingCancelBlocked" />],
  ['Home / Credit review in progress', (rtl) => <HomePage rtl={rtl} state="creditReview" />],
  ['Credit Application / Basic', (rtl) => <CreditBasicSection rtl={rtl} />],
  ['Credit Application / Education options', (rtl) => <EducationOptions rtl={rtl} />],
  ['Credit Application / Marital status options', (rtl) => <MaritalStatusOptions rtl={rtl} />],
  ['Credit Application / Children options', (rtl) => <ChildrenOptions rtl={rtl} />],
  ['Credit Application / Pay Period options', (rtl) => <PayPeriodOptions rtl={rtl} />],
  ['Credit Application / Salary Day calendar', (rtl) => <SalaryDayCalendar rtl={rtl} />],
  ['Credit Application / Basic with other loans', (rtl) => <CreditBasicSection rtl={rtl} otherLoans overLimit />],
  ['Credit Application / Contact', (rtl) => <ContactApplication rtl={rtl} />],
  ['Credit Application / CNIC', (rtl) => <CnicApplication rtl={rtl} />],
  ['Credit Application / CNIC uploaded failure', (rtl) => <CnicApplication rtl={rtl} uploadFailureSide="front" />],
  ['Credit Application / CNIC camera', (rtl) => <CnicCamera rtl={rtl} />],
  ['Credit Application / CNIC camera review', (rtl) => <CnicCamera rtl={rtl} confirm />],
  ['Credit Application / CNIC filled', (rtl) => <CnicFilledApplication rtl={rtl} />],
  ['Credit Application / CNIC filled no sheet', (rtl) => <CnicFilledApplication rtl={rtl} showCitySheet={false} />],
  ['Withdrawal / Add method', (rtl) => <WithdrawalMethod rtl={rtl} />],
  ['Facial Verification / Guide', (rtl) => <FacialGuide rtl={rtl} />],
  ['Facial Verification / Scan', (rtl) => <FacialScan rtl={rtl} />],
  ['Facial Verification / Scan review', (rtl) => <FacialScan rtl={rtl} photoReview />],
  ['Facial Verification / Scan failed', (rtl) => <FacialScan rtl={rtl} recognitionFailed />],
  ['Application Status / Under review', (rtl) => <ApplicationStatus rtl={rtl} state="review" />],
  ['Application Status / Rejected', (rtl) => <ApplicationStatus rtl={rtl} state="rejected" />],
  ['Application Status / Approved', (rtl) => <ApplicationStatus rtl={rtl} state="approved" />],
  ['Loan / Summary', (rtl) => <LoanSummary rtl={rtl} />],
  ['Loan / Summary expired', (rtl) => <LoanSummary rtl={rtl} expired />],
  ['Loan / Funds disbursed', (rtl) => <FundsDisbursed rtl={rtl} />],
  ['Application Status / Transfer processing', (rtl) => <TransferProcessingPage rtl={rtl} />],
  ['Application Status / Unknown reason failed', (rtl) => <TransferFailedPage rtl={rtl} />],
  ['Application Status / Application declined reference', (rtl) => <ApplicationDeclinedReferencePage rtl={rtl} />],
  ['Register / Login', (rtl) => <Login rtl={rtl} />],
  ['Register / Login error', (rtl) => <Login rtl={rtl} error />],
  ['Register / OTP', (rtl) => <Otp rtl={rtl} />],
  ['Register / whatsapp OTP', (rtl) => <Otp rtl={rtl} channel="whatsapp" />],
  ['Register / OTP error/loading', (rtl) => <Otp rtl={rtl} error loading />],
  ['Register / Unlock pattern verification', (rtl) => <PatternVerify rtl={rtl} />],
  ['Register / Unlock pattern error', (rtl) => <PatternVerify rtl={rtl} error />],
  ['Register / Pattern setup', (rtl) => <Pattern rtl={rtl} />],
  ['Register / Pattern confirm error', (rtl) => <Pattern rtl={rtl} confirm error />],
  ['Account / Profile not logged in', (rtl) => <Profile rtl={rtl} loggedIn={false} />],
  ['Account / Profile logged in', (rtl) => <Profile rtl={rtl} />],
  ['Account / Profile verification', (rtl) => <ProfileVerification rtl={rtl} />],
  ['Account / Coupon', (rtl) => <CouponEmpty rtl={rtl} />],
  ['Account / Calculator 3 installments', (rtl) => <CalculatorPage rtl={rtl} months={3} />],
  ['Account / Calculator 6 installments', (rtl) => <CalculatorPage rtl={rtl} months={6} />],
  ['Account / About Us', (rtl) => <AboutTerms rtl={rtl} />],
  ['Account / FAQ', (rtl) => <FAQ rtl={rtl} />],
  ['Account / Terms', (rtl) => <TermsList rtl={rtl} />],
  ['Setting', (rtl) => <Settings rtl={rtl} />],
  ['Setting / Reset Password', (rtl) => <ResetPassword rtl={rtl} />],
  ['Setting / Reset Password OTP', (rtl) => <SmsOnlyOtp rtl={rtl} flow="reset" />],
  ['Setting / Devices Manager', (rtl) => <Devices rtl={rtl} />],
  ['Setting / Account Cancel', (rtl) => <AccountDelete rtl={rtl} />],
  ['Setting / Account Cancel OTP', (rtl) => <SmsOnlyOtp rtl={rtl} flow="delete" />],
  ['Common states / Network error', (rtl) => <CommonState rtl={rtl} type="network" />],
  ['Common states / Server unavailable', (rtl) => <CommonState rtl={rtl} type="server" />],
  ['Common states / Session expired', (rtl) => <CommonState rtl={rtl} type="session" />],
  ['Common states / Empty records', (rtl) => <CommonState rtl={rtl} type="empty" />],
];

const phase3RepaymentPairs = [
  ['Phase 3 Repayment / Single bill overdue expanded', (rtl) => <Phase3Repayment rtl={rtl} mode="singleOverdue" />],
  ['Phase 3 Repayment / Single bill before due', (rtl) => <Phase3Repayment rtl={rtl} mode="beforeDue" />],
  ['Phase 3 Repayment / Multiple bills overdue', (rtl) => <Phase3Repayment rtl={rtl} mode="multiOverdue" />],
  ['Phase 3 Repayment / Order details cooling-off', (rtl) => <Phase3OrderDetails rtl={rtl} state="cooling" />],
  ['Phase 3 Repayment / Order details overdue settlement', (rtl) => <Phase3OrderDetails rtl={rtl} state="overdue" />],
  ['Phase 3 Repayment / Order details early settlement', (rtl) => <Phase3OrderDetails rtl={rtl} state="upcoming" />],
  ['Phase 3 Repayment / History paid off', (rtl) => <Phase3History rtl={rtl} />],
  ['Phase 3 Repayment / No data', (rtl) => <Phase3Empty rtl={rtl} />],
  ['Phase 3 Repayment / Payment success', (rtl) => <Phase3PaymentSuccess rtl={rtl} />],
];

const newRequirementNames = new Set([
  'Home Page Copy',
  'Home / Application under review',
  'Home / Reapply after 7 days',
  'Home / Not eligible',
  'Home / Choose amount',
  'Home / 15 days remaining',
  'Home / Repayment due soon',
  'Home / Repayment overdue',
  'Home / Multiple bills overdue',
  'Home / Cooling-off cancellation limit',
  'Home / Credit review in progress',
  'Credit Application / Basic',
  'Credit Application / Education options',
  'Credit Application / Marital status options',
  'Credit Application / Children options',
  'Credit Application / Pay Period options',
  'Credit Application / Salary Day calendar',
  'Credit Application / Basic with other loans',
  'Credit Application / Contact',
  'Credit Application / CNIC',
  'Credit Application / CNIC uploaded failure',
  'Credit Application / CNIC camera',
  'Credit Application / CNIC camera review',
  'Credit Application / CNIC filled',
  'Credit Application / CNIC filled no sheet',
  'Withdrawal / Add method',
  'Facial Verification / Guide',
  'Facial Verification / Scan',
  'Facial Verification / Scan review',
  'Facial Verification / Scan failed',
  'Application Status / Under review',
  'Application Status / Rejected',
  'Application Status / Approved',
  'Loan / Summary',
  'Loan / Summary expired',
  'Loan / Funds disbursed',
  'Application Status / Transfer processing',
  'Application Status / Unknown reason failed',
  'Application Status / Application declined reference',
]);

const phase3RequirementNames = new Set(phase3RepaymentPairs.map(([name]) => name));
const newDialogNames = ['Credit Application Limit Dialog', 'Application Exit Retention Dialog', 'Wallet Confirm Dialog', 'Satisfaction Feedback Dialog'];
const oldDialogNames = ['Dialogs, Toasts, System Permission'];
const pageId = (name) => `page-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

function PageNav() {
  const newPages = screenPairs.filter(([name]) => newRequirementNames.has(name));
  const oldPages = screenPairs.filter(([name]) => !newRequirementNames.has(name));
  return (
    <aside className="spec-panel nav-panel">
      <h1>页面导航</h1>
      <p>新需求单独列在前面；旧页面已经交给技术开发，放在下方备查。</p>
      <section>
        <h2>Phase 3 Repayment</h2>
        <nav className="nav-links phase3-nav">
          {phase3RepaymentPairs.map(([name]) => <a key={name} href={`#${pageId(name)}`}>{name.replace('Phase 3 Repayment / ', '')}</a>)}
        </nav>
      </section>
      <section>
        <h2>New Requirements</h2>
        <nav className="nav-links">
          {newPages.map(([name]) => <a key={name} href={`#${pageId(name)}`}>{name}</a>)}
          {newDialogNames.map((name) => <a key={name} href={`#${pageId(name)}`}>{name}</a>)}
        </nav>
      </section>
      <section>
        <h2>Old Delivered Pages</h2>
        <nav className="nav-links old">
          {oldPages.map(([name]) => <a key={name} href={`#${pageId(name)}`}>{name}</a>)}
          {oldDialogNames.map((name) => <a key={name} href={`#${pageId(name)}`}>{name}</a>)}
        </nav>
      </section>
    </aside>
  );
}

function ScreenSet({ title, kicker, className = '' }) {
  return (
    <section className={`version-section ${className}`}>
      <div className="section-heading">
        <span>{kicker}</span>
        <h2>{title}</h2>
      </div>
      <div className="mockup-grid paired-grid">
        <div className="page-pair phase3-section-pair" id="phase3-repayment-start">
          <h3>Phase 3 Repayment · 第三期还款新页面</h3>
          <p className="phase3-section-note">这组页面根据本轮 13 张还款参考图重做视觉交互，单独放在导航最上方，便于和旧版本区分。</p>
        </div>
        {phase3RepaymentPairs.map(([name, render]) => (
          <div className="page-pair phase3-page new-page" id={pageId(name)} key={name}>
            <h3>{name}</h3>
            <div className="pair-body phase3-pair-body">
              <div><span className="locale-label">English · LTR</span>{render(false)}</div>
              <div><span className="locale-label">Urdu · RTL</span>{render(true)}</div>
            </div>
          </div>
        ))}
        {screenPairs.map(([name, render]) => (
          <div className={`page-pair ${newRequirementNames.has(name) ? 'new-page' : 'old-page'}`} id={pageId(name)} key={name}>
            <h3>{name}</h3>
            <div className="pair-body">
              <div><span className="locale-label">English · LTR</span>{render(false)}</div>
              <div><span className="locale-label">Urdu · RTL</span>{render(true)}</div>
            </div>
            {name === 'Facial Verification / Guide' && (
              <div className="page-reference">
                <span className="locale-label">Provided reference</span>
                <img
                  src="/facial-verification-guide-reference.png"
                  alt="Facial verification guide reference"
                />
              </div>
            )}
          </div>
        ))}
        <div className="page-tile wide-tile old-page" id={pageId('Dialogs, Toasts, System Permission')}><h3>Dialogs, Toasts, System Permission</h3><DialogStates /></div>
        <div className="page-tile wide-tile new-page" id={pageId('Credit Application Limit Dialog')}><h3>Credit Application Limit Dialog</h3><CreditLimitDialog /></div>
        <div className="page-tile wide-tile new-page" id={pageId('Application Exit Retention Dialog')}><h3>Application Exit Retention Dialog</h3><ApplicationExitDialog /></div>
        <div className="page-tile wide-tile new-page" id={pageId('Wallet Confirm Dialog')}><h3>Wallet Confirm Dialog</h3><WalletConfirmDialog /></div>
        <div className="page-tile wide-tile new-page" id={pageId('Satisfaction Feedback Dialog')}><h3>Satisfaction Feedback Dialog</h3><SatisfactionDialog /></div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <PageNav />
      <div className="showcase-stack">
        <ScreenSet
          title="New Version · Big Tech App Style"
          kicker="Mature product redesign"
          className="youth-theme"
        />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
