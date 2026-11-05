---
title: The field guide to apps that remember
chapter: storage
kind: reading
time: Reference - dip in when you are curious or stuck
id: vibe-reading-storage
lede: Where an app keeps what it knows, who else can see it, and how to take it with you.
video: 
video-length: 
transcript: 
---

You do not have to read this first. Every lab has a button at the top that jumps to the one section it needs.

Until now, your apps have had the memory of a goldfish. Refresh the page and everything they knew was gone. This chapter they learn to remember - and you find out exactly where that memory lives, who can see it, and why it does not follow you from your laptop to your phone.

::: raw
<div class="contents">
  <p>In this reading</p>
  <ol>
    <li><a href="#forget">Why apps forget</a></li>
    <li><a href="#box">The box in the browser</a></li>
    <li><a href="#json">JSON: writing data down</a></li>
    <li><a href="#content">Content goes at the top</a></li>
    <li><a href="#yours">Your data is yours</a></li>
    <li><a href="#island">Every device is an island</a></li>
    <li><a href="#private">What never goes in the box</a></li>
  </ol>
</div>
:::

::: section
id: forget
title: 1. Why apps forget

While a page is open, everything it knows - your score, the list you typed, which question you are on - sits in the page's **memory**. Memory is fast, and it is temporary. Refresh, close the tab, or let the computer restart, and the page starts again from nothing, exactly as the file describes it.

Try it. Press the button a few times, then press **Reset** above the code. Reset reloads the page, the same as a refresh.

::: demo
file: forget.html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 20px; text-align: center; }
  button { font: inherit; font-size: 20px; padding: 10px 20px; cursor: pointer; }
  #count { font-size: 48px; font-weight: 800; margin: 10px 0; }
</style>
</head>
<body>
<p>Times pressed:</p>
<p id="count">0</p>
<button id="press">Press me</button>
<script>
  // The count lives in MEMORY: a variable. It starts at 0
  // every single time the page opens.
  let count = 0;
  document.getElementById('press').onclick = function () {
    count = count + 1;
    document.getElementById('count').textContent = count;
  };
</script>
</body>
</html>
:::

Back to zero. To remember, a page needs somewhere to put things that a refresh
does not touch. That is **storage**, and the next section is the simplest kind.
:::

::: section
id: box
title: 2. The box in the browser

Every browser keeps a small box for each website, called **`localStorage`**. A page can put things in the box and take them out again, and the box survives refreshes, closed tabs, restarts - weeks, if nobody empties it.

If you were on the internet in the late 1990's or early 2000's - heck, even today - you might remember the troubleshooting step of "emptying your cache". That "cache" is some form of storage saved locally on your computer or in the browser.

It works like a set of labeled jars. You put something in under a name (the **key**) and get it back later by that name:

```
localStorage.setItem('best-score', '42');    // put 42 in the jar labeled best-score
localStorage.getItem('best-score');          // ...later: what is in that jar? "42"
```

Seven things worth knowing about the box:

- **It only holds text.** Numbers and lists have to be turned into text on the way
  in and back on the way out. Section 3 is how.
- **It belongs to one browser.** Chrome's box is not Safari's box. Your phone has
  boxes of its own.
- **It belongs to one site address.** A page opened from a file on your computer
  and the same page at your `github.io` address are two addresses with two
  different boxes.
- **It is not a vault.** Anyone using that browser can open Developer Tools,
  click the **Application** tab, and read or change everything in it. Section 7
  has the rules that follow from that.
- **It can be emptied.** Clearing your browsing data empties it. So does a
  private window, every time it closes.
- **It can say no.** Some private windows and locked-down computers refuse to let
  pages save at all. A good app copes: it keeps working and says it cannot
  remember.
- **It is small** - a few megabytes per site. Plenty for scores, lists and
  settings. Not for photos or videos.
:::

::: section
id: json
title: 3. JSON: writing data down

The box only holds text, but your data is not text. It is a list of questions,
or habits with their days, or items with ticks. To store it, the app writes it out
as text in a format called **JSON**, and reads that text back in later.

- `JSON.stringify` turns data into JSON text (to save it, or put it in a file).
- `JSON.parse` turns JSON text back into data (to use it).

Change the list below - add a habit, tick another day - and watch the JSON
change with it.

::: demo
file: json.html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 12px; }
  pre { background: #f4f1ea; padding: 10px; border-radius: 8px; white-space: pre-wrap; }
</style>
</head>
<body>
<p><strong>The data</strong>, as the app holds it - then written down as JSON:</p>
<pre id="out"></pre>
<script>
  // Today's date as year-month-day text, like a habit tracker stores it.
  const now = new Date();
  const today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

  // Some data: two habits, each with the days it was done.
  const data = {
    habits: [
      { name: 'Drink water', days: [today] },
      { name: 'Walk outside', days: [] }
    ]
  };

  // JSON.stringify writes it out as text. The 2 means "indent by two
  // spaces", so a person can read it too.
  const text = JSON.stringify(data, null, 2);
  document.getElementById('out').textContent = text;

  // And JSON.parse reads the text back into data the code can use:
  const back = JSON.parse(text);
  console.log(back.habits[0].name);   // "Drink water"
</script>
</body>
</html>
:::

You met JSON once before: `manifest.json` in the extensions chapter. Same rules,
and they are strict - **double quotes only, no comments, no comma after the last
item.** One mistake and `JSON.parse` refuses the whole thing. That strictness is a
good thing: a damaged file fails loudly instead of loading half your data.
:::

::: section
id: content
title: 4. Content goes at the top

There is a new last line in your specification:

> *If the app has teacher-editable content (words, questions, names, data), store
> it in a clearly labeled array or object at the very top of the JavaScript - not
> scattered through the code - so it is easy to find and update without touching
> anything else.*

It has been in my copy since the first week. You are seeing it now because the quiz lab gave you the reason: somebody wanted to add ten questions, and whether they could depended entirely on *where the questions lived*.

Every app has two kinds of stuff in it:

- **Content** - the questions, the words, the names, the starting habits. The things a person might want to change next week.
- **The code** - the code that shows a question, checks an answer, counts a streak. The things that should not need changing at all.

Keep the content in one labeled list at the top, and make the machine only *read* that list, and the two never get tangled. Anybody - you next month, a teacher, a client - can update the content without understanding the machine. You saw a small version of this way back with the flashcards, and again with the settings list at the top of your growing thing.

The list has a **structure**: every question has a question, a right answer and three wrong ones, in the same order. Data with a dependable shape is data that a person, an AI or another program can write - which is why a fresh chat could write ten questions that slotted straight in.
:::

::: section
id: yours
title: 5. Your data is yours

Plenty of apps keep your data where only they can see it. Years of workouts, recipes, notes, photos - and no way to take them with you. If you want to leave, you leave them behind. That is called **lock-in**, and it is a dirty design. Many places now have laws giving people the right to a copy of their own data, because so many apps made it hard.

The respectful pattern is two buttons:

- **Export** writes everything out as a file the person keeps. With JSON, that file is readable - open it in any text editor and there is your data. - **Import** brings a file back: after the browser was cleared, on a new computer, on a phone.

An export is also a **backup**. The box in the browser can be emptied in one click; a file in a safe place cannot.

**Never trust an imported file.** It might be from an old version of your app, edited by hand, damaged, or built by somebody trying to break things. A good import:

1. **checks the structure** - is this really one of our files? Throw away anything that does not fit;
2. **shows what is in it** - *this file holds 4 habits and 31 ticked days*;
3. **asks** before replacing anything.

The same goes for anything that arrives in a link. You learned it with the
invitation that turned a name bold: whatever comes from outside is a suggestion,
not an instruction.
:::

::: section
id: island
title: 6. Every device is an island

Your laptop's browser has a box. Your phone's browser has a box. They  don't talk to each other. That is why the best score on your laptop is zero on your phone, and why your packing list is not on your phone at the store.

There is a line in your specification that has been quietly true all along:

> *No data sent to any server - everything runs in the browser only*

That line is why every app you have built is so private: nothing you typed, no photo, no score ever left your device. It is also exactly why your devices cannot share. Sharing needs a place they can all reach.

That place is a **server** - a computer somewhere that is always on and that your devices talk to. The code in your browser is the **front end**. The code on the server is the **back end**. An app with an account you sign in to on any device has both.

Ways to save the data, from simplest to most powerful:

- **A link** carrying the data - the packing list. A one-time copy, no server. Put the data after a `#` and it is never even sent to the website.
- **A file** - export on one device, import on the other. A one-time copy, no server, and a backup besides.
- **A server** - real sync: change it here, see it there. That is a later chapter, where you write a small back end of your own.

**Ready-made back ends exist** - services that store your app's data for you.
Most need a secret key, and a key written into front-end code can be read by
anyone who opens Developer Tools. Where that leads is the next chapter.

**Google Sheets** is one more option worth knowing about for an app you build
for somebody else. With a little extra setup, an app can save into a Google
Sheet - and then the person you built it for can open the data in a spreadsheet
they already know, to sort it, print it, or add a column. Not taught here; it is
there if a project needs it.
:::

::: section
id: private
title: 7. What never goes in the box

The box is plain text on somebody's computer, readable by anyone at that
keyboard. So:

- **Never passwords, or anything that unlocks something.** Not in the box, not in
  an export, not in a link.
- **Nothing you would mind a roommate reading.** Health details, money, private
  notes about other people. A shared or library computer keeps the box for the
  next person.
- **Nothing that must not be changed.** A score is fine. A "this person has paid"
  or "this person is an admin" flag is not - you changed your own best score to
  99999 in about ten seconds.
- **Give people a way out.** A *Delete everything* button (that asks twice) lets
  somebody remove their data from a shared computer before they walk away.

Your specification says *fully accessible*. It is worth adding, in your head:
*and kind to the person whose data it is.*
:::
