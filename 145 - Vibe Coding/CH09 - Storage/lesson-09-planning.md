# Lesson plan - Chapter 9: Storage - apps that remember

**Key:** `storage` · **Folder:** `09-storage` · **Week:** 10 · **Status:** BUILT 2026-10-31, rev 1. Dave edits, then we rebuild.

**History.** The design doc (section 4, old "Week 8") planned five builds here:
the habit tracker, the quiz (the manufactured planning pain), the partner swap,
the growing thing remembers, and a shared guestbook on JSONBin. This build keeps
the first, second and fourth, reshapes the partner swap, and replaces the
JSONBin guestbook. Reasons are in section 11.

**The rules this chapter obeys**
- No new tool. The technology axis moves (persistence); the tooling axis stays
  still.
- The editable-content spec line is **revealed in 9.2**, as the answer to the
  pain in 9.1. 9.1 is built with the line withheld (`withhold-editable: yes`,
  a new header field - see section 8).
- Every app here stays true to *"No data sent to any server"*. That line is
  explained in the field guide as the reason the apps are private **and** the
  reason devices cannot share. A server arrives in chapter 12.
- Every app reads storage inside try/catch and keeps working when storage says
  no; every app treats saved data, links and imported files as untrusted.
- Required steps (Picture it, Ask for it, Run it) reach every Definition of Done
  on their own.

---

## 1. Where you are now

Your apps can draw, use the camera, read QR codes and move on their own. And
every one of them has the memory of a goldfish: refresh, and everything it knew
is gone. Your growing thing forgot its best score on purpose last chapter.

This chapter they remember. A quiz somebody else can add to, a game that keeps
its best score, a list that travels to your phone, and a habit tracker you will
actually use - which lets you take your data with you.

---

## 2. The one idea

**Memory is temporary. Storage survives. And storage lives in one browser, on
one device, for one site address.**

- **`localStorage`** - a box per site, key and value, text only.
- **JSON** - how data becomes text and back (`stringify`, `parse`).
- **Content vs machine** - content in one labeled list at the top; the machine
  only reads it. (The spec line reveal.)
- **Your data is yours** - export and import; never trust an imported file.
- **Every device is an island** - which is the *other* side of "no data sent to
  any server". Ways across: a link, a file, and (later) a server.

**Deliberately not this chapter:** `sessionStorage`, IndexedDB, cookies, any
hosted back end (JSONBin, Firebase, Sheets - named, not built), sync.

---

## 3. The video

**Length target:** 6-7 minutes. Face on camera. Four movements as always.

| Movement | Time | What happens |
|---|---|---|
| **Where you are now** | 0:00-0:45 | Star Catcher v1: get a score, refresh, gone. *Goldfish.* |
| **The one idea** | 0:45-2:30 | Star Catcher v1.1: score, refresh, still there. Open Developer Tools, Application, Local storage: *here is the box, and here is my score in it.* Double-click it, type 99999, refresh. *Champion. That is the second lesson.* |
| **Watch me** | 2:30-5:30 | The habit tracker: tick, Export, open the JSON in TXTEDTR and read it aloud. Delete everything; Import; it is back. Then import a junk `.json` and watch it refuse. Then the packing list: QR code on screen, phone camera, the "This link carries a list" question. |
| **What you'll build** | 5:30-6:30 | The quiz - and do **not** mention where the questions should go. The reveal belongs to 9.2. |

The deliberate-mistake beat is the 99999.

---

## 4. Concepts, in teaching order

1. Memory vs storage; a refresh starts from nothing *(9.0)*
2. Where the AI put the content - noticed, not judged *(9.1)*
3. Content vs machine; the editable-content spec line revealed *(9.2)*
4. Data has a shape; a fresh chat can write data that fits *(9.2)*
5. Hand edit inside a list: the comma, the quote, the apostrophe *(9.2)*
6. `localStorage`: key and value, text only *(9.0, 9.3)*
7. The Application tab; reading and changing the box *(9.3)*
8. One browser, one device, one site address (file vs `github.io`) *(9.3, 9.4)*
9. Storage can say no; try/catch; private windows *(9.0, 9.3)*
10. Data in a link after `#` - never sent to the website *(9.4)*
11. A copy is not a sync; every device is an island *(9.0, 9.4)*
12. Anything arriving from outside is a suggestion: check, show, ask *(9.4, 9.5)*
13. JSON: `stringify`, `parse`, the strict rules *(9.0, 9.5)*
14. Export and import; backups; lock-in *(9.0, 9.5)*
15. Local dates vs UTC *(9.5)*
16. Front end, back end, server - named *(9.0)*
17. What never goes in the box *(9.0)*

---

## 5. Vocabulary

Added under a chapter 9 heading. `localStorage`, key and value, and JSON already
exist (from the extensions chapter).

memory (in memory) · storage ★ · Application tab [T] · site address (one box per
address) [T] · `JSON.stringify` ★ · `JSON.parse` ★ · content vs code ★ · export ★ ·
import ★ · backup · lock-in ★ · sync · front end ★ · back end ★ · server ★ · `#`
in a link (fragment) [T] · private window [T] · UTC [T]

---

## 6. The labs, in order

| # | Title | ⏱ | Folder | Guide section | See Example |
|---|---|---|---|---|---|
| 9.0 | The Field Guide to Apps That Remember | 15m | - | - | - |
| 9.1 | A Quiz on Anything | 30m | `quiz` | `forget` | `quiz-v1/` |
| 9.2 | Ten More Questions | 25m | `quiz` (+ `quiz-v1`) | `content` | `quiz/` |
| 9.3 | Your Growing Thing Remembers | 20m | their growing thing | `box` | `star-catcher/` |
| 9.4 | Send It to Your Phone | 30m | `packing-list` (their name) | `island` | `packing-list/` |
| 9.5 | Habit Tracker ★ | 45m | `habits` | `yours` | `habits/` |

About 150 minutes plus the video. The anchor is last and carries the report:
*where does your data live and who can see or change it*, and *export, break it,
import - what did your app do, and was that right?*

**The pain in an asynchronous section.** The design doc's version is *"next
session, the teacher needs ten more questions"*. Online there is no next
session, so 9.2 *is* the next session: its Picture it delivers the request as a
message, and asks students to judge their own 9.1 file before seeing the line.
Two honest caveats: many AIs already put quiz questions in an array, and
students met the pattern in the flashcards and the growing thing's settings. So
9.2 asks three questions, not one - *in one place? at the top? labeled so a
stranger could use it?* - and very few v1 files pass all three.

---

## 7. The example apps

In `daves-files/vibe-coding/`, one `index.html` each, Content Security Policy
blocking all network requests (the packing list allows jsDelivr for scripts
only), dark mode, 44px targets, no sideways scroll at 360px.

| Folder | Notes |
|---|---|
| `quiz-v1/` | Five questions written straight into the HTML as fieldsets, the right answer in `data-correct`. Works, looks fine - and is the "before" for 9.2. |
| `quiz/` | v2.0: `QUIZ_TITLE` and a 15-question `QUESTIONS` list at the top, with a comment written for a non-coder. Right answer first; the quiz shuffles choices and questions. One question at a time, feedback in words (✓/✗), focus managed. Questions are course vocabulary, so it doubles as review. |
| `star-catcher/` | v1.1: best score in `localStorage` (`star-catcher-best`), read with try/catch, junk counts as 0, "Forget my best score" button. The chapter 8 version is now `star-catcher-v1/`. |
| `packing-list/` | `STARTING_ITEMS` at the top. Saved as JSON in `localStorage`. "Send to my phone" builds `…/packing-list/#list=<json>` and paints the QR itself from qrcode-generator 2.0.4 (jsDelivr, pinned, SRI hash). Refuses on `file://`, warns over 1800 characters. Incoming lists are cleaned (shape, 100 items, 120 chars), previewed, and need Add / Replace / No thanks; the hash is removed from the address after. |
| `habits/` | `STARTING_HABITS` at the top. Seven-day grid of `aria-pressed` buttons with a ✓; streak alive until midnight; local-time day keys (noon trick for daylight saving). Export as pretty JSON via Blob; import capped at 1 MB, rebuilt field by field, summary then confirm. Remove and Delete everything ask twice; Delete saves an empty list so the starters do not return. Warns when storage is refused. |

The demo hub has a new **Apps that remember** group (quiz, packing list,
habits); Star Catcher's line now says it remembers.

---

## 8. The spec block

This is the chapter `editableLine` turns on (it already was, in
`chapters.json`). One exception: 9.1 sets `withhold-editable: yes`, a new
header field added to `build/build.py` on 2026-10-31 (backup:
`build.py.bak-withhold`). Without it the quiz would be built *with* the line and
the pain would never happen.

`_toolsSpecChapter` moved from `files` to `storage`, so the Tools page now
shows the full spec, editable line and library line included.

---

## 9. Failure modes to pre-empt

1. **A missing comma or a stray apostrophe in the question list.** Cards in 9.1
   and 9.2; the generated comment in the example explains `\'`.
2. **Saved under one key, read under another.** Card in 9.3 and 9.5, with the
   Application tab as the check.
3. **The empty box at the `github.io` address.** Expected in 9.3's Read it and
   9.4's Run it, so it lands as a lesson rather than a bug.
4. **NaN / [object Object].** Text-only storage. Card in 9.3.
5. **A QR code that holds a `file://` address.** Card in 9.4; the example
   refuses outright.
6. **Evening ticks landing on tomorrow (UTC via `toISOString`).** Read it and a
   card in 9.5.
7. **Starting habits returning after Delete everything.** Card in 9.5.

---

## 10. Instructor prerequisites

- A phone for the video's QR beat, with the packing list open at its
  `github.io` address.
- A junk `.json` file to import on camera.
- Update the demo repo **before** the chapter opens: `quiz-v1`, `quiz`,
  `star-catcher` (changed) and `star-catcher-v1`, `packing-list`, `habits`, and
  the hub `index.html`.

---

## 11. Open for Dave

1. **The JSONBin guestbook is out.** Writing to JSONBin needs a key, and a key
   in a public `github.io` page lets anyone overwrite or wipe the bin - the
   exact lesson chapter 10 is built to *end* on. Doing it here either spoils
   that wall or ships an insecure app without comment. Chapter 12 already has a
   PHP Public Guestbook. **Replaced by 9.4, Send It to Your Phone** (a link, a
   QR code, no server), and the field guide names hosted back ends and Google
   Sheets without building one. Put JSONBin back if you would rather.
2. **The partner swap is a Grow step** in 9.2 (hand the quiz to a non-coder and
   watch them add a question), not a required lab. Pairing is hard in an
   asynchronous section. If you run a discussion board, it could become "swap
   quizzes with a classmate" there.
3. **"Read the board's source"** stays cut - the board is deferred this
   semester.
4. **Consulting track.** The calendar says *revision loop → sign-off* this week;
   nothing here supports it. Still happening?
5. **9.4 needs the site online and a phone.** A student with no phone can still
   meet the Definition of Done by opening the copied link in a second browser
   (an empty box) - worth a sentence in Brightspace if that is a concern.
6. **Chapter 8's See Example for the growing thing** points at `star-catcher/`,
   which now remembers. Point it at `star-catcher-v1/` if you want it to match
   chapter 8 exactly.

---

## 12. Verification, 2026-10-31

The six example apps were run in headless Chromium (Playwright); 46 checks, all
passing:

- **Quiz v1:** four right and one wrong scores 4/5.
- **Quiz:** 15 questions in `QUESTIONS`; all right scores 15/15; focus moves to
  Next; a wrong answer shows the right one in words; Play again restarts.
- **Star Catcher:** best score survives a refresh; Forget empties it and it stays
  empty; `banana` in storage reads as 0.
- **Packing list:** starts with 4; an added item and a tick survive a refresh;
  `<img onerror>` in an item shows as text; the QR code **decodes (jsQR) to the
  page with the list after `#`**; opened in a fresh browser it asks first,
  changes nothing until asked, strips the hash, and Replace brings all five
  items as text; a refresh does not ask again; a junk link changes nothing.
- **Habits:** three starters; today ticks with `aria-pressed`; focus stays put;
  streak 3, and a yesterday-only streak counts 1; survives refresh; export is
  readable JSON; Delete everything (two presses) empties it and it stays empty;
  a junk file is refused; a hand-edited file shows a summary, changes nothing
  before Yes, imports 4 habits with HTML as text, and drops bad dates.
- **All:** no console errors; no sideways scroll at 360px.
