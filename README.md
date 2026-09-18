# Voltify

**Projekt zespołowy — część frontendowa aplikacji mobilnej**

## Autor

**Karolina Sumowska**  
Kierunek: **Informatyka**  
Uczelnia: **Uniwersytet Mikołaja Kopernika w Toruniu**

---

## O projekcie

**Voltify** to aplikacja mobilna przeznaczona do obsługi i zarządzania inteligentnym domem (**Smart Home**).

Projekt został zrealizowany w ramach pracy zespołowej. Niniejsze repozytorium zawiera moją część projektu, obejmującą frontend aplikacji mobilnej oraz elementy związane z projektem interfejsu i identyfikacją wizualną aplikacji.

---

## Mój wkład w projekt

W ramach projektu samodzielnie zrealizowałam:

- frontend aplikacji mobilnej w **React Native**,
- projekt interfejsu użytkownika,
- przygotowanie mockupów i prototypu aplikacji w **Figmie**,
- zaprojektowanie logo aplikacji **Voltify**,
- przygotowanie ulotki promującej aplikację.

Pozostałe elementy projektu zostały przygotowane wspólnie z pozostałymi członkami zespołu.

---

## Technologie i narzędzia

- **React Native** — implementacja frontendu aplikacji mobilnej,
- **Expo** — uruchamianie i testowanie aplikacji,
- **JavaScript / TypeScript** — [usuń niewłaściwą technologię],
- **Figma** — projekt interfejsu, mockupy i prototyp aplikacji,
- **Visual Studio Code** — środowisko programistyczne.

---

## Projekt aplikacji w Figmie

Interfejs aplikacji oraz jej prototyp zostały przygotowane w **Figmie**.

🔗 [Otwórz projekt aplikacji w Figmie](https://www.figma.com/proto/pk1NiUfH8Dj1pOOWfmE3xS/Licencjat?node-id=589-8932&t=guzRjSqLsrcWMTF6-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=552%3A3028)

### Wybrane widoki aplikacji

<p align="center">
  <a width="622" height="535" alt="image" src="https://github.com/user-attachments/assets/e181cb6e-1673-4977-9388-f180b1b19ca4"> </a>a>
</p>

<p align="center">
 <a width="696" height="297" alt="image" src="https://github.com/user-attachments/assets/9d9f3a83-41f4-4471-ba95-bfcc34b78b63">1</a>

  <a width="747" height="440" alt="image" src="https://github.com/user-attachments/assets/8eb6e703-474d-4911-abad-788b678c81c1">2</a>
  •
  <a width="693" height="418" alt="image" src="https://github.com/user-attachments/assets/1e96480b-ad97-4288-aaeb-a3ada72a37a6">3</a>
  •
  <a width="625" height="783" alt="image" src="https://github.com/user-attachments/assets/a97ce702-5c08-4147-a73b-30d58976afb6">4</a>
   •
<a width="709" height="669" alt="image" src="https://github.com/user-attachments/assets/7dd6ea8a-86ae-4deb-9b9b-6d0fa315a50d">5</a>
   •
<a width="813" height="811" alt="image" src="https://github.com/user-attachments/assets/b95b5918-a246-4532-9665-d86ba5d6eb4e">6</a>
 •
<a width="741" height="725" alt="image" src="https://github.com/user-attachments/assets/c4a7a35f-0a3e-415e-bdc9-6f70b4b32009">7</a>
 •
<a width="500" height="486" alt="image" src="https://github.com/user-attachments/assets/fb9fa038-0e57-4d13-8758-6582e6b6d4d8">8</a>
 •
<a width="780" height="359" alt="image" src="https://github.com/user-attachments/assets/8d01e140-0e84-4e0b-95dd-36f3297c6dbc">9</a>
</p>

---

## Identyfikacja wizualna

W ramach projektu przygotowałam również identyfikację wizualną aplikacji, w tym logo oraz materiały promocyjne.

### Logo

<p align="center">
  <img src="https://github.com/user-attachments/assets/42b98667-49cf-45b7-900e-045d160e2aca" alt="Logo aplikacji Voltify" width="488" height="368">
</p>

### Ulotka

<p align="center">
  <img src="https://github.com/user-attachments/assets/f4283f0a-26b4-4860-ad40-2d27b28ab394"
       alt="Voltify - widok aplikacji"
       width="500">
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/f4283f0a-26b4-4860-ad40-2d27b28ab394">1</a>
  •
  <a href="https://github.com/user-attachments/assets/cf01e2fe-2e54-472a-ae0c-c4bd3a9588da">2</a>
  •
  <a href="https://github.com/user-attachments/assets/f000bdf0-1c38-489d-8a29-5c3bb51b622c">3</a>
  •
  <a href="https://github.com/user-attachments/assets/30c8ea6f-823e-4330-8441-2e8ddcb65bd9">4</a>
</p>

---

## Uruchomienie aplikacji

### Wymagania

Przed uruchomieniem projektu upewnij się, że masz zainstalowane wymagane zależności środowiska **React Native** oraz **Expo**.

Szczegółowa instrukcja konfiguracji środowiska znajduje się w dokumentacji:

- [React Native — Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)
- [Expo — Get Started](https://docs.expo.dev/get-started/set-up-your-environment/)

### Instalacja

1. Otwórz folder projektu w **Visual Studio Code**.

2. W terminalu zainstaluj wymagane zależności:

```bash
npm install --legacy-peer-deps
```

3. Uruchom serwer Expo:

```bash
npx expo start
```

---

## Uruchomienie na iOS

> Uruchomienie symulatora iOS jest możliwe wyłącznie na systemie macOS.

Po uruchomieniu serwera Expo:

- naciśnij `i`, aby uruchomić aplikację w symulatorze iOS,
- aby uruchomić aplikację na fizycznym urządzeniu, postępuj zgodnie z dokumentacją Expo dotyczącą uruchamiania aplikacji na urządzeniu.

---

## Uruchomienie na Androidzie

Po uruchomieniu serwera Expo:

- naciśnij `a`, aby uruchomić aplikację na skonfigurowanym **Android Virtual Device**,
- aby uruchomić aplikację na fizycznym urządzeniu, postępuj zgodnie z dokumentacją Expo dotyczącą uruchamiania aplikacji na urządzeniu.

---

## Zakres repozytorium

Repozytorium przedstawia frontendową część aplikacji mobilnej **Voltify**, którą samodzielnie zaprojektowałam i zaimplementowałam w ramach projektu zespołowego.

Oprócz kodu aplikacji repozytorium zawiera również materiały prezentujące proces projektowania interfejsu oraz elementy identyfikacji wizualnej projektu.

---

## Podsumowanie

**Voltify** łączy funkcjonalność aplikacji mobilnej do zarządzania inteligentnym domem z zaprojektowanym przeze mnie interfejsem użytkownika i spójną identyfikacją wizualną.

Moim głównym zakresem odpowiedzialności w projekcie była implementacja frontendu aplikacji mobilnej oraz przygotowanie projektu **UI/UX**, prototypu w Figmie i materiałów wizualnych.
