---
title: Habit tracker
chapter: storage
time: About 45 minutes
id: vibe-lab-habits
lede: Tick off your habits, watch your streaks grow - and keep your data, because it is yours.
done: `habits/index.html` remembers your ticks after a refresh, exports a .json file you can open and read, and importing that file brings everything back after Delete everything.
demo: https://corydave.github.io/vibe-coding/habits/
report: yes
q1: Where exactly does your habit tracker keep your data, and who could see or change it?
q2: Export, change something in the file by hand (or break it on purpose), and import it. What did your app do - and was that the right thing?
video: 
video-length: 
transcript: 
guide: yours
guide-label: Your data is yours
---

::: picture
Drink water. Read twenty minutes. Walk outside. Stretch. Whatever you are trying
to do more of, a habit tracker gives you one tap a day and a number that grows -
*a 6-day streak* - that you will not want to break.

This is the app in the chapter you are most likely to *use*, so it gets the most
care. It remembers everything in `localStorage`. And it does one more thing that
plenty of apps you pay for do not:

**It lets you take your data with you.** An Export button writes everything out
as a file you keep. An Import button brings it back - after you clear your
browser, on a new laptop, or on your phone. Your habits are yours, not the
app's.

Building that well means meeting **JSON** properly: the format your data is
written in, inside the box and inside the file.
:::

::: ask
Start a new chat and describe it. Make sure it says:

- A habit tracker. A list of habits I can add to and remove from, starting with
  three: *your three*
- A grid of the last seven days, with a button for each habit on each day to
  tick it - real buttons that work with the keyboard, tell a screen reader
  whether they are pressed, and show a check mark, not just a color
- A streak for each habit: the days in a row up to today. If today is not ticked
  yet, the streak is still alive until midnight
- Save everything in `localStorage` as JSON
- An "Export my data" button that downloads everything as a readable `.json`
  file
- An "Import a file" button that checks the file carefully, shows what is in it,
  and asks before replacing anything
- A "Delete everything" button that asks twice
- If the browser will not let the page save, say so and keep working

Then paste the specification at the end, exactly as it is.

{{spec}}
:::

::: run
1. Make a new folder: `vibe-coding/habits`. Save the code in it as
   `index.html` and open it.
2. Tick today for a habit or two, and a few earlier days. Watch the streaks.
3. **Refresh.** Everything still ticked?
4. **Export.** Press Export my data, and find the `.json` file in your Downloads
   folder. Open it in TXTEDTR and read it. You should recognize your habits and
   your days.
5. **The round trip.** Press Delete everything (twice). It is all gone. Now
   press Import a file, choose your export, and say yes. It is all back.
6. **Try to fool it.** Import a file that is *not* an export - any other `.json`
   file, or a text file renamed to end in `.json`. The app should refuse it, and
   change nothing.

::: tree
alt: Folder diagram. The vibe-coding folder contains a new habits folder holding index.html. Separately, the Downloads folder holds an exported habits json file.
caption: The app lives in your folder. The export lands in Downloads - keep it somewhere safe, it is your backup.
vibe-coding/
├── ...
└── habits/
    └── index.html   [[← this lab]]

Downloads/
└── habits-export.json   (your file may be named with the date)
:::
:::

::: read
::: q
**Look at your exported file in TXTEDTR. What do you recognize?**
---
Your habit names, in quotes, and lists of days, each written as numbers in
year-month-day order. The curly brackets `{ }` hold one thing's details, the square
brackets `[ ]` hold a list, and every name and piece of text is in double
quotes. That is **JSON**. It is the same text that sits in the browser's box: the
app turns its data into JSON to save it (`JSON.stringify`) and turns the JSON back
into data to use it (`JSON.parse`). The export is just that text, handed to you.
:::

::: q
**Why does the app check an imported file at all? You made it.**
---
*This* time you made it. A file can come from anywhere: an old version of the
app, an email attachment, a friend, somebody hoping to break things. It could be
half-broken, edited by hand, or deliberately strange. An app that loads whatever
it is given will one day load something that wipes your streaks or worse. The
rule from the sharing chapter, again: **never trust data you did not make** - and
treat data you *did* make, once it has been out of your hands, as data you did
not.
:::

::: q
**Tick today late in the evening. Did the tick land on the right day?**
---
It should - but this is one of the most common bugs in any app that deals with
days. Computers keep time in a worldwide standard time (UTC), and *today* in
UTC can already be *tomorrow* where you are. If your evening ticks land on the
next day, see the Troubleshooting card about dates.
:::

::: q
**Name an app or website that has your data and no Export button.**
---
Plenty do. When the only way to see your own data is inside one app, you cannot
leave without losing it - that is called **lock-in**, and it is deliberate.
Many places now have laws giving people a right to a copy of their data. Your
app gives that right away with one button.
:::
:::

::: yours
Make it yours. Open the file in TXTEDTR, find the starting habits in the list at
the top of the script, and change them to the habits you actually want. Then
press Delete everything (so the app starts fresh with your new list) and start
ticking.

Then a look of your own:

::: prompt
Let me pick an emoji and a color for each habit, shown in its row and saved with it. Keep everything else exactly the same.
:::
:::

::: grow
One at a time, saving a `habits-v1` copy first:

- **A month view.** *"Add a month calendar for each habit, with ticked days
  filled in, and Previous and Next buttons."*
- **Notes.** *"Let me add a short note to any day, saved with it and included
  in the export."* Then export and look for your notes in the JSON.
- **Merge, not replace.** *"When importing, let me choose: replace everything,
  or add the file's ticks to what is here."*
- **Move it to your phone.** Put the app online, open it on your phone, and
  import your export file there (AirDrop it, email it to yourself, or save it to
  a cloud folder). The round trip, across islands.
:::

::: keep
- Your habit tracker is `vibe-coding/habits/index.html`. Put it online.
- **Keep your export somewhere safe** - not just Downloads. It is your backup.
- **Use it.** Tick something every day for a week.
- **Fill in the lab report below.** This is the chapter's anchor.
:::

::: trouble
**My ticks are gone after a refresh.**

They are not being saved, or they are saved under one name and read under
another. Open Developer Tools, Application, Local storage: if nothing is there,
tell the AI *"nothing is saved in localStorage when I tick a day."* If something
is there, say *"it is saved but not loaded when the page opens."*
---
**Ticks I make in the evening land on tomorrow.**

The app is working out "today" in worldwide time (UTC) instead of yours. Tell the
AI: *"dates must use my local time zone, not UTC - do not use toISOString for
the day."*
---
**Export downloads nothing, or an empty file.**

Say exactly what you got: *"Export downloads a file but it is empty"* or
*"pressing Export does nothing - here is the console error."*
---
**Import does nothing, or says the file is damaged when it is my own export.**

The import check may be stricter than the export. Tell the AI: *"importing a
file that this app exported fails - make the import accept exactly what the
export produces."*
---
**I pressed Delete everything and my starting habits came back.**

The app removed the saved data, so next time it started fresh with the starting
list. Ask for *"after Delete everything, save an empty list so the starting
habits do not come back."*
---
**A streak looks one day off.**

Streaks have edge cases: today not ticked yet, a gap, a tick in the future. Tell
the AI the exact days you ticked and the streak it showed, and the one you
expected.
:::
