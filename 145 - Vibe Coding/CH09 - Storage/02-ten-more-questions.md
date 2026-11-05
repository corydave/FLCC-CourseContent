---
title: Ten more questions
chapter: storage
time: About 25 minutes
id: vibe-lab-ten-more
lede: Somebody loves your quiz. They want to add ten questions of their own - and they do not write code.
done: Every question in `quiz/index.html` lives in one clearly labeled list at the top of the script, and you have added at least ten new questions to that list without touching anything else.
demo: https://corydave.github.io/vibe-coding/quiz/
video: 
video-length: 
transcript: 
guide: content
guide-label: Content goes at the top
---

::: picture
Here is the message you get:

> *Love the quiz! I'd like to use it with my group. I've got ten more
> questions - can I just add them myself? I don't know anything about code.*

A teacher, a coach, a co-worker, a parent - somebody wants to use what you
built. Open your quiz in TXTEDTR and look at it honestly. **Could they add ten
questions on their own?**

If your questions were scattered through the file, mixed in with the code that
runs the quiz, the honest answer is *no*. They would have to find every piece,
copy blocks of code they do not understand, and get every quote mark and comma
right - ten times. One slip and the whole quiz goes blank.

If your questions were already in one tidy list, you are partway there - but
look again. Is the list at the very *top*? Is it labeled so a stranger could
find it? Does it explain how to add one?

**Look at the very last line of the specification in this lab.** It is new. It
has been in my copy all along; you are seeing it now because now you know why it
matters.
:::

::: ask
**First, save a copy.** Duplicate your `quiz` folder and call the copy
`quiz-v1`. You are about to change the inside of your quiz, and v1 is the
version that works.

Then open the chat you built the quiz in (or start a new one and paste your
whole `index.html` in) and send this:

::: prompt
Move every question, answer and the quiz title into one clearly labeled list at the very top of the script. Above the list, write a plain-language comment explaining how somebody who does not code can add a question. For each question, write the right answer first and let the quiz mix up the choices by itself. The rest of the code must never mention a specific question - it only reads the list. Keep everything else exactly the same.
:::

And paste the specification at the end, exactly as it is - with its new last
line.

{{spec}}
:::

::: run
1. Paste the new code over everything in `quiz/index.html`, save, and play it.
   It should be the same quiz - same questions, same look.
2. **Find the list.** Open the file in TXTEDTR. Your questions should be at the
   top of the script, in a list, with a comment above them.
3. **Add one by hand.** Copy one whole question - from its opening `{` to its
   closing `}` and the comma after it - and paste it right after itself. Change
   the words. Save, refresh, and play until your new question comes up.
4. **Now add ten.** Start a *new* chat, send the prompt below, and paste one of
   your questions underneath it as the example.

::: prompt
Write ten more quiz questions about my topic, in exactly the same format as this example. Only give me the ten questions, nothing else.
:::

Copy the ten it gives you, paste them into your list after your last question,
save, and refresh. Fifteen questions.

::: tree
alt: Folder diagram. The vibe-coding folder contains quiz-v1, the version from the last lab, and quiz, the new version with every question in one list at the top.
caption: v1 is your safety net. The new version replaces the one you will share.
vibe-coding/
├── ...
├── quiz-v1/
│   └── index.html
└── quiz/
    └── index.html   [[← this lab]]
:::
:::

::: read
::: q
**Why insist that the rest of the code never mentions a specific question?**
---
Because then the questions are **content** and everything else is the
**machine** that runs them. You can change the content as often as you like -
add ten, delete three, fix a typo - and the machine never needs touching. It
just reads whatever is in the list. That is the line between *editing the
quiz* and *programming the quiz*, and it is the line that lets somebody who
does not code take over.
:::

::: q
**Open your `quiz-v1`. What would ten more questions have cost in that version?**
---
Depends on what you found in the last lab. If the questions were written into
the page one block at a time, ten more meant ten big copies of HTML, every tag
just right, plus wherever the right answers lived. If they were already in a
list but mixed into the code, a stranger still had to find it. The new version
costs one paste. Same quiz, same look - the only thing that changed is where the
words live.
:::

::: q
**Why could a brand-new chat write ten questions that slotted straight in?**
---
Because your questions now have a **shape**: a question, a right answer, three
wrong ones, in the same order every time. Anything with a reliable shape can be
written by a person, by an AI, or by another program, and the quiz will read it.
That idea - data with a dependable shape, kept separate from the code - runs
through the rest of this chapter.
:::

::: q
**From now on, every specification you paste has that last line. What kind of
app will it change?**
---
Anything with content somebody might want to update: the words in a word game,
the names on a team picker, the items on a menu, the starting habits in a
tracker. The AI puts them in one labeled list at the top, so you - or the person
you build it for - can change them without asking the AI at all.
:::
:::

::: yours
Make the list friendlier still:

::: prompt
Add an optional "why" to each question: one sentence shown after answering that explains the right answer. If a question has no "why", show nothing extra. Keep everything else exactly the same.
:::

Then write a "why" for three of your questions by hand, in the list.
:::

::: grow
**The real test - a stranger.** Send your `quiz` file to somebody who does not
code: a friend, a family member, a classmate. Ask them to add one question
using nothing but the comment at the top of the list. Do not help. Watch where
they get stuck - then ask the AI to make the comment clearer at exactly that
spot.

**No file at all.** Ask for *"an Edit questions screen where somebody can add,
change and delete questions in a form, saved in the browser, with buttons to
download the questions as a file and load them back."* That is a big step, and
it uses everything in the next three labs.
:::

::: keep
- Your quiz is `vibe-coding/quiz/index.html`, with `quiz-v1` beside it.
- Put the new version online - drag the `quiz` folder onto your repository on
  `github.com`.
- **Write down** whether your v1 would have passed the "ten more questions"
  test, and what the stranger got stuck on if you tried Grow.
:::

::: trouble
**I added questions and now the page is blank.**

A missing comma between two questions, or a missing quote mark inside one. Open
the Developer Console; the red line names the line number. Every question needs
a comma after its closing `}` except, optionally, the last one.
---
**My new questions do not show up.**

Check you saved the file you are looking at - not `quiz-v1`. Then refresh. If
the quiz shuffles, play right through to the end; your question may simply not
have come up yet.
---
**The AI changed how the quiz looks while moving the questions.**

It took the chance to tidy up. Paste your `quiz-v1` code back in and ask again,
ending with *"keep the look exactly the same - only move where the questions
live."*
---
**A question with an apostrophe broke the list.**

In a list written with single quotes, *Dave's* ends the text early. Write the
apostrophe as `\'` (`'Dave\'s'`), or ask the AI to *"use double quotes around
every question so apostrophes are safe."*
:::
