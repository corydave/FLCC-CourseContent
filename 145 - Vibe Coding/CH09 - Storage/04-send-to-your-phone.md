---
title: Send it to your phone
chapter: storage
time: About 30 minutes
id: vibe-lab-send-to-phone
lede: A list that lives on your laptop, beamed to your phone with a QR code. No account, no server, no app store.
done: Your list app is online, remembers its list after a refresh, and scanning its QR code with your phone puts the same list on your phone after asking first.
demo: https://corydave.github.io/vibe-coding/packing-list/
video: 
video-length: 
transcript: 
guide: island
guide-label: Every device is an island
---

::: picture
You make a packing list on your laptop the night before a trip. Or a grocery
list, or the chores for the weekend. Then you are standing in the store, and the
list is on the laptop, at home.

Last lab you found out why: every browser on every device has its own box. Your
phone's box has never heard of your laptop's. **Every device is an island.**

The usual fix is an account and a server somewhere that both devices talk to.
Today you skip all of that with three things you already know:

- **A list saved in `localStorage`** - from the last lab.
- **Information carried in a link** - the invitations and decision makers from
  the sharing chapter.
- **A QR code** - from your very first app.

Press *Send to my phone* and the app puts the whole list *inside* a link to
itself, and shows that link as a QR code. Point your phone at it. Your phone
opens the same page, finds the list in the link, and asks: *add these to your
list?*
:::

::: ask
Start a new chat and describe it. Make sure it says:

- A list app for *your kind of list* - packing, groceries, chores - with a few
  starting items
- Add items, tick them off, remove them
- Save the list in `localStorage` so it is still there tomorrow
- A "Send to my phone" button that puts the whole list into a link to this
  same page, after a `#` sign, and shows that link as a QR code using a QR code
  library
- When the page opens from a link that carries a list, show what is in it and
  **ask** before adding it - never replace my list without asking
- Treat anything that arrives in a link as plain text, and ignore anything that
  is not a proper list
- Tell me if the list is too long to fit in a QR code

Then paste the specification at the end, exactly as it is.

{{spec}}
:::

::: run
1. Make a new folder named for your list - `packing-list`, `groceries`,
   `chores` - and save the code in it as `index.html`.
2. Open it in Chrome. Add a few items, tick one, and **refresh**. Still there?
3. **Put it online.** A QR code has to hold an address your phone can open, and
   your phone cannot open a file on your laptop. Drag the folder onto your
   repository on `github.com`, wait a minute, and open its `github.io` address.
4. Your items are not there - just the starting ones. The `github.io` page has
   its own box (you found that out last lab). Add your items again here.
5. Press **Send to my phone**, point your phone's camera at the QR code, and
   tap the link it offers.
6. On your phone: read what it says is in the link, and choose to add it.

::: tree
alt: Folder diagram. The vibe-coding folder contains the app folders from earlier chapters and a new folder for your list, shown as packing-list, holding index.html.
caption: One file again. The list itself lives in each browser's box, and travels in the link.
vibe-coding/
├── ...
├── quiz/
└── packing-list/
    └── index.html   [[← this lab]]
:::

**Background check.** Your app borrowed a QR library. Open the file, find its
address, and ask the four questions from the libraries chapter. It should come
from a big CDN with an exact version number. If not, ask the AI to pin it.
:::

::: read
::: q
**Tick an item on your phone. Does your laptop see the tick?**
---
No. The link carried a *copy* of the list, once, like handing somebody a note.
After that, the phone's list and the laptop's list are two separate lists on two
separate islands. Keeping them in step - a real **sync** - needs one place both
devices can reach, which means a server. That is a later chapter. Today's trick
is a copy, and for a packing list, a copy is plenty.
:::

::: q
**Why put the list after a `#` and not after a `?`, like the invitations in the
sharing chapter?**
---
Everything after a `#` stays on the device that opened the link. The browser
never sends it to the website - not even to GitHub, which hosts your page. The
part after a `?` *is* sent to the website every time. For an invitation that
did not matter. For your list, `#` means it goes from your laptop screen, to
your phone's camera, to your phone - and nowhere else.
:::

::: q
**Who can read your list?**
---
Anybody who sees the QR code or the link. Point a phone at it and the whole list
is right there. So: groceries, fine. Your passwords, never. The app's job is to
not *send* your list anywhere; yours is to not put anything private in it.
:::

::: q
**Why does the phone ask before adding the list?**
---
Because anybody can make a link. Somebody could send you a link carrying a
two-hundred-item list of nonsense, or text shaped to break the page. A good app
treats whatever arrives in a link as a *suggestion*: it checks the shape, shows
it as plain text, and lets you say no. Remember the invitation that turned a
name bold? Same lesson, bigger stakes.
:::
:::

::: yours
Make it the list you actually need. Open the file in TXTEDTR, find the starting
items in the list at the top of the script, and change them to yours. Save,
refresh. (A brand-new visitor sees these; your own saved list stays as it is.)

Then:

::: prompt
Let me give each item a category - like Clothes, Toiletries and Tech - and group the list by category. Keep the categories in the link too. Keep everything else exactly the same.
:::
:::

::: grow
- **Both ways.** You already have it: open the app on your phone, press *Send to
  my phone* there, and point the *laptop's* camera at it with the QR scanner you
  built last chapter.
- **Share with a person.** Ask for *"a Share button that uses the phone's own
  share menu to send the link by text or email."* Then think about who can read
  that text message.
- **Too long for a QR code?** Ask for *"if the list is too long, split it across
  two QR codes, part 1 and part 2."* Then decide whether that was worth it.
:::

::: keep
- Your list app is in its own folder in `vibe-coding`, and it is online.
- **Use it.** Put the list you actually need on your phone this week.
- **Write down** what surprised you - the empty list at the `github.io`
  address, the copy that does not sync, how much fits in one QR code.
:::

::: trouble
**The QR code opens `file:///...` on my phone, or nothing at all.**

The QR code holds the address of the page that made it. Made from a file on your
computer, it holds a file address your phone cannot open. Open the app from its
`github.io` address and make the QR code there.
---
**My phone opens the page, but no list arrives.**

The link may have been cut short, or the page is not reading it. Tell the AI:
*"the page opens from the link but does not offer the list - check that it reads
the list after the # when the page loads."*
---
**It replaced my list without asking.**

That is the one thing it must not do. Tell the AI: *"when a list arrives in a
link, show it and ask whether to add it, replace mine, or ignore it."*
---
**The phone camera cannot read the QR code.**

Long lists make dense QR codes. Turn the laptop's screen brightness up, hold the
phone still, or remove a few items. If it is still too dense, ask for *"a bigger
QR code with a white border around it."*
---
**The QR code never appears.**

The QR library probably did not load. Open the Developer Console - a red line
about a script that failed to load means the address is wrong or the internet
is down. Run the background check on that address.
:::
