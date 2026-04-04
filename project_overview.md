# Proje İncelemesi: Teknolojiler ve Mimari

Bu belge, kişisel portfolyo projesinin ( `/Users/alpi/projects/personal_site` ) kod tabanının incelenmesi sonucunda projedeki teknolojileri, bunların kullanım amaçlarını ve genel yazılım mimarisini açıklamaktadır.

## 1. Kullanılan Teknolojiler

Proje, modern ve performanslı bir web uygulaması geliştirmek için güncel web standartlarından oluşan güçlü bir teknoloji yığınına sahiptir:

- **Next.js (v15.5.14) & React (v19.1.0):** 
  - *Ne işe yarar:* Projenin temel iskeletini oluşturur. React bileşen tabanlı bir UI geliştirme imkanı sunarken, Next.js ise sunucu tarafı render etme (SSR), statik site oluşturma (SSG) ve App Router gibi özellikler sayesinde yüksek performans ve SEO uyumluluğu sağlar.
- **TypeScript:** 
  - *Ne işe yarar:* JavaScript'e statik tip denetimi ekler. Hataları daha kod yazarken (derleme aşamasında) yakalamayı sağlar, projenin okunabilirliğini artırır ve gelişmiş otomatik tamamlama desteği verir.
- **Tailwind CSS (v4):**
  - *Ne işe yarar:* Stil şablonları oluşturmak yerine, HTML/JSX içerisine yazılan utility-class'lar ile (örneğin `flex`, `text-center`, `bg-bg-deep`) elementleri çok hızlı ve standart bir şekilde şekillendirmeyi sağlar.
- **OpenRouter AI (Qwen Modeli):**
  - *Ne işe yarar:* Portfolyoya yerleştirilmiş "Kariyer Sohbet Botu" (Career Chatbot) için Büyük Dil Modeli (LLM) altyapısını sağlar. `qwen/qwen3.6-plus:free` modeli kullanılarak sunucu üzerinden akıcı (stream) bir sohbet deneyimi sunulur.
- **ESLint & Turbopack:**
  - *Ne işe yarar:* ESLint, kodda standart dışı yazımları ve potansiyel hataları bulup uyarır. Turbopack ise Next.js'in geliştirme sunucusu için inanılmaz hızlı paketleme (bundler) desteği sağlar (`next dev --turbopack`).

---

## 2. Proje Mimarisi

Dizin yapısı modern bir **Next.js App Router** projesine göre kurgulanmış olup, içerik yönetimi sade ve veritabanı gerektirmeyecek şekilde statik dosyalara indirilmiştir.

### Dizin Yapısı ve Dağılım:

- `src/app/` (Uygulama Temeli ve Rotasyon)
  - Projenin sayfalarını ve API uç noktalarını barındırır.
  - `page.tsx:` Ana sayfanın (Landing Page) yapısını tutar.
  - `layout.tsx:` Tüm sayfalara uygulanan genel HTML bileşenlerini ve kapsayıcıları (Head, Body vb.) yönetir.
  - `globals.css:` Tailwind CSS'in ve global stil tanımlamalarının bulunduğu CSS dosyası.
  - `api/chat/route.ts:` Yapay zeka entegrasyonu için güvenli (istemciye API anahtarlarını sızdırmadan) Server API rotası görevi görür. OpenRouter API'sine burada istek atılıp, cevap SSE (Server-Sent Events) ile istemciye stream edilir.

- `src/components/` (UI Bileşenleri)
  - Uygulama içinde birden fazla yerde kullanılabilecek, görevi daraltılmış kapsüllü React modülleri burada yer almaktadır.
  - Örneğin: Sayfa bölümleri için `Section.tsx`, zaman çizelgesi için `CareerTimeline.tsx`, yapay zeka arayüzü için `CareerChat.tsx` vb.

- `src/content/` (İçerik/Veri Katmanı)
  - `profile.ts:` Eğitimi, tecrübeyi ve yetenekleri saklayan statik veri dosyasıdır. Harici bir veri tabanı kullanmak yerine bu yaklaşım seçilmiş; bu da uygulamanın inanılmaz hızlı çalışmasını, zero-downtime yaşamasını ve maliyetsiz barındırılmasını (`DEPLOY.md` içindeki statik host/Vercel vb.) sağlamıştır.

- `src/lib/` (Yardımcı Fonksiyonlar ve Servisler)
  - `careerContext.ts:` Statik olarak tutulan kariyer bilgilerini, bir yapay zekanın bağlam (Context) olarak anlayabileceği şekle çeviren (`SYSTEM_INSTRUCTIONS` ile birlikte) yardımcı yapıları içerir.

### Genel Sistem İşleyişi:

Genel mimari **Static Verili Frontend + Stateless API Backend** yaklaşımı ile tasarlanmıştır.

1. Kullanıcı ana sayfaya bağlandığında Next.js App Router devreye girer. Next.js, sayfa verilerini `src/content/profile.ts` dosyasından okuyup UI'ı sunucuda veya derleme (build) sırasında oluşturarak kullanıcıya tarayıcıda sunar.
2. Arayüzde kullanılan "Career Q&A" sohbet butonu tıklandığında, `src/components/CareerChat.tsx` açılır.
3. Kullanıcı buraya soru sorduğunda, Next.js'in API Route katmanına (`src/app/api/chat/route.ts`) istek atılır.
4. Sunucu (API Route), `src/lib/careerContext.ts` içerisindeki kariyer içerik bilgilerini alarak Qwen Yapay Zeka Modeline kullanıcının son mesajlarıyla birlikte gönderir. Soruya site sahibinin bilgileri referans alınarak yanıt üretilir.
5. Yapay Zeka modeli yanıtı Server-Sent Events ile UI'a akıcı asenkron (streaming) bir şekilde aktarır, UI bu değişikliği kullanıcıya doğrudan hissettirir.
