# Crimson Clips — uruchomienie

Gotowy frontend oparty na przesłanej konfiguracji Next.js 16.4.3, React 19.3.0 i Tailwind 4. Dodana zależność: lucide-react. Animacje korzystają z CSS i respektują prefers-reduced-motion.

## Dodanie do istniejącego projektu

1. Zrób kopię swojego folderu `crimson-clips-web`.
2. Rozpakuj ZIP w osobnym miejscu. Skopiuj zawartość znajdującego się w nim folderu `crimson-clips-web` do swojego projektu.
3. Jeśli masz `app/` w katalogu głównym, zastąp jego `page.tsx`, `layout.tsx` i `globals.css` plikami z paczki. Zachowaj inne własne podstrony.
4. Jeśli masz zamiast tego `src/app/`, umieść katalogi `app`, `components`, `lib`, `types` z paczki wewnątrz `src/`. Nie zostawiaj wtedy drugiego `app/` w katalogu głównym. `public/` pozostaje w katalogu głównym. W testach zmień import `../lib/validation.ts` na `../src/lib/validation.ts`.
5. W terminalu VS Code otwartym w katalogu projektu wykonaj:

```powershell
npm install
npm run dev
```

Otwórz http://localhost:3000. Jeśli port jest zajęty, użyj adresu wskazanego przez terminal.

Przesłana konfiguracja `next.config.ts` jest zachowana. Paczka zawiera oryginalne zależności oraz lucide-react i plik blokady npm. Nie zawiera node_modules, .next ani sekretów. Przed nadpisaniem własnego ESLint porównaj konfigurację — dostarczono standardową konfigurację Next.js.

## Co działa

- Sekcje hero, how it works, about, submit, community i footer.
- Oryginalne tło, prawdziwe elementy HTML, responsywne układy, mobilne menu, link pomijający nawigację, focus i ograniczenie animacji.
- Formularz: wymagane pola, email, URL, zgoda, MP4/MOV/WebM, limit 500 MiB, drag-and-drop, nazwa pliku i usuwanie wyboru.
- Przycisk sprawdza wyłącznie dane lokalne. Nie wysyła danych, nie zapisuje pliku, nie symuluje postępu wysyłania ani sukcesu uploadu.
- Krótki stan sprawdzania i komunikat wyniku lokalnego. Interfejs przyszłego uploadu zawiera callback postępu i AbortSignal.

## Co trzeba podłączyć przed publicznym uruchomieniem

- Prawdziwe adresy YouTube/TikTok i kontakt. Aktualnie są jawne placeholdery, bez fikcyjnych kont.
- Pełną politykę prywatności i warunki zgłoszeń. Obecne rozwijane teksty opisują tylko demo.
- Backend metadanych, np. Supabase, i prywatny magazyn filmów, np. Cloudflare R2.
- Zaimplementować `SubmissionTransport` z `types/submission.ts`: serwer waliduje metadane i wydaje krótkotrwały podpisany URL; przeglądarka wysyła plik bezpośrednio do magazynu, raportuje faktyczny postęp i następnie potwierdza zgłoszenie na serwerze. Wymagane są weryfikacja rozmiaru i typu po stronie serwera oraz obsługa nieudanych i przerwanych przesłań. Nie przekazuj sekretów klientowi ani dużych filmów przez zwykły handler Next.js.
- Limit rozmiaru konfiguruje `lib/constants.ts`. Walidacja przeglądarkowa jest pomocą dla użytkownika, nie kontrolą bezpieczeństwa.

## Sprawdzenie

```powershell
npm run lint
npm run build
node --experimental-strip-types --test tests/validation.test.mjs
```

Test walidacji wymaga Node.js z obsługą usuwania typów TypeScript (np. Node 22.6+ lub 24).

Sprawdzono build produkcyjny, TypeScript, ESLint i testy walidacji. Testy obejmują dozwolone formaty, niezgodny MIME, pusty plik i granicę rozmiaru. Podgląd wizualny i testy interakcji w przeglądarce nie zostały wykonane: środowisko podglądu dodaje flagi nieobsługiwane przez Next.js. Przed publikacją sprawdź stronę lokalnie przy szerokościach 360, 390, 768, 1024, 1440 i 1920 px.

Nie miałem dostępu do Twojego VS Code ani istniejących plików app/src. To paczka do scalenia z projektem, nie zmiana wykonana na Twoim komputerze.

## Grafika

`public/images/crimson-night.webp` — oryginalny obraz wygenerowany wbudowanym narzędziem imagegen i skompresowany do WebP. Nie zawiera zrzutu strony, logo gry ani napisów. Prompt zapisany w `IMAGE-PROMPT.txt`.
