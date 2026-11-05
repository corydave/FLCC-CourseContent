---
title: Your growing thing remembers
chapter: storage
time: About 20 minutes
id: vibe-lab-remembers
lede: Last chapter, a refresh wiped your best score. Today your growing thing learns to remember.
done: Your growing thing shows a best score (or a saved setting) that is still there after you refresh the page, and after you quit the browser and open it again.
demo: https://corydave.github.io/vibe-coding/star-catcher/
video: 
video-length: 
transcript: 
guide: box
guide-label: The box in the browser
---

::: picture
Remember what happened when you refreshed your growing thing? Your best score
vanished. Everything the game knew lived in the page's memory, and a refresh
wipes the page clean.

Today it gets a place to keep things that a refresh cannot touch:
**`localStorage`**, a small box the browser keeps for each website. Put a value
in under a name, and next time - after a refresh, after you quit the browser,
next week - ask for it by that name and it is still there.

It is the simplest way there is to make an app remember. It also has some
surprising rules about *who* gets to see what is in the box, and you are going to
find all of them by poking at it.

**Built an interactive piece instead of a game?** There is nothing to score -
so remember a *setting* instead: the colors someone picked, the speed, whether
the sound is on, the last thing they made.
:::

::: ask
Start a new chat, paste in your growing thing's whole `index.html`, and send
this (a game) or the one after it (an interactive piece):

::: prompt
label: Copy the game prompt
Save the best score in localStorage so it survives a refresh and closing the browser, and show it on screen. Add a "Forget my best score" button that clears it. If the browser will not let the page save, the game must still work. Keep everything else exactly the same.
:::

::: prompt
label: Copy the interactive prompt
Remember my settings in localStorage - the choices someone has made, like colors, speed and sound - so they are still set after a refresh or closing the browser. Add a "Reset to defaults" button. If the browser will not let the page save, it must still work. Keep everything else exactly the same.
:::

Then paste the specification at the end, exactly as it is.

{{spec}}
:::

::: run
1. **Save a copy first** if you have not: your growing thing's folder, with
   `-v1` on the end.
2. Paste the new code over your growing thing's `index.html`, save, and play
   until you have a score (or change a setting).
3. **Refresh.** Still there?
4. **Quit Chrome completely and open the file again.** Still there?
5. Press **Forget my best score** (or **Reset**), and refresh. Gone?

Then go and find the box itself. Open the Developer Tools (right-click the page,
**Inspect**), choose the **Application** tab, and under **Storage** open **Local
storage**. Click the address underneath. There is your saved value, in plain
sight, under the name the AI gave it.

::: tree
alt: Folder diagram. The vibe-coding folder contains a growing thing folder, shown as star-catcher, now beside a star-catcher-v1 copy.
caption: Still one file. The saved score is not in your folder at all - it lives inside the browser.
vibe-coding/
├── ...
├── star-catcher-v1/
└── star-catcher/
    └── index.html   [[← this lab]]
:::
:::

::: read
::: q
**In the Application tab, double-click your saved best score and type 99999.
Refresh. What happened?**
---
You are the champion now. The box is on *your* computer, in *your* browser, and
you can open it and change anything in it. That is fine for your own high score.
It is a big deal for anything that matters - a scoreboard with prizes, an
"already paid" flag, a "this user is an admin" setting. **Anything stored in the
browser can be read and changed by whoever is sitting at it.** Put your real
score back, or press Forget.
:::

::: q
**Open the same file in a different browser - Safari, Edge or Firefox. What is
your best score there?**
---
Zero. Every browser has its own boxes. Chrome's box is not Safari's box, and
neither is the one on your phone. Same file, same computer, different browser:
an empty box.
:::

::: q
**Upload the new version and open it at your `github.io` address. Best score?**
---
Zero again - even in Chrome. The box belongs to the *site address*. A file
opened from your computer and the same page opened from `github.io` are two
different addresses, so they get two different boxes. (That one surprises
everybody once.)
:::

::: q
**So where does the best score actually live?**
---
In one browser, on one device, for one site address. Not in your file, not in
your folder, not on GitHub. Clear your browsing data, use a private window, or
pick up a different device, and it is not there. The rest of this chapter is
about living with that - and getting around it.
:::
:::

::: yours
Remember one more thing. Some ideas: whether the sound is muted, the player's
name, the last level reached, a color they chose. Ask for it the same way:

::: prompt
Also remember [the thing] in localStorage, and put it back the way it was when the page opens. Keep everything else exactly the same.
:::
:::

::: grow
**A top five.** Ask for *"a high score table of the top five scores, each with a
name and the date, saved in localStorage as JSON."* Then look in the Application
tab: the value is a list written out as text. That text is JSON, and it is the
subject of the next two labs.

**A shared leaderboard?** Ask yourself before you ask the AI: could your friends'
scores appear on *your* table? They cannot - their scores are in boxes on their
devices. A table everybody shares needs one place everybody can reach: a server.
That is a later chapter.
:::

::: keep
- Your growing thing is in its folder, with a `-v1` copy beside it.
- Put the new version online - drag the folder onto your repository on
  `github.com`.
- **Write down** the surprises: the other browser, the `github.io` address, the
  99999.
:::

::: trouble
**The best score still resets when I refresh.**

Either it is never being saved, or it is being saved under one name and read
back under another. Tell the AI: *"the best score is not there after a refresh -
make sure it is saved at game over and read back with the same key when the
page loads."* The Application tab shows whether anything was saved at all.
---
**It shows NaN, or [object Object], or null.**

The box only holds text. A number has to be turned into text going in and back
into a number coming out, and a list or an object has to be turned into JSON.
Say exactly what you saw: *"the best score shows NaN after a refresh."*
---
**It remembers on my computer but not on my phone.**

That is how `localStorage` works - every device has its own box. Nothing is
broken.
---
**In a private window it forgets everything.**

Private windows throw the box away when they close. That is their job.
---
**The page went blank after the change.**

Some browsers refuse to let a page use storage at all, and code that does not
expect a *no* crashes. Tell the AI: *"wrap every localStorage call in try and
catch, so the game still works when storage is not allowed."*
:::
