---
title: A quiz on anything
chapter: storage
time: About 30 minutes
id: vibe-lab-quiz
lede: Five questions on something you know inside out. Then hand it to someone and see how they do.
done: `quiz/index.html` asks your five questions one at a time, says whether each answer was right, and shows a score at the end with a way to play again.
demo: https://corydave.github.io/vibe-coding/quiz-v1/
withhold-editable: yes
video: 
video-length: 
transcript: 
guide: forget
guide-label: Why apps forget
---

::: picture
Everybody knows a lot about *something*. A TV show you have watched three times
through. Your job. A sport, a band, a video game, your hometown, the words from
this course. Today you turn what you know into a quiz.

Five multiple-choice questions, one at a time. Pick an answer and the quiz tells
you straight away whether you were right - and if you were not, what the right
answer was. A score at the end, and a button to play again.

Build it the way you have built everything so far. Describe it, paste the specification, run it. Then give it to somebody and watch them play.
:::

::: ask
First, write your five questions - in the chat box or on paper. For each one, the question, the right answer, and three wrong answers that sound believable. (Good wrong answers are the hard part of writing a quiz.)

Then start a new chat and describe it. Make sure it says:

- A multiple-choice quiz about *your topic*, with a title
- Here are my five questions, each with its right answer and three wrong
  answers - then paste yours
- One question at a time; when I pick an answer, tell me if I was right, and
  if I was wrong, show the right answer
- A score at the end, and a Play again button
- I can play it with the keyboard alone

Then paste the specification at the end of your prompt, exactly as it is.

{{spec}}
:::

::: run
1. Make a new folder: `vibe-coding/quiz`.
2. Copy the code, paste it into TXTEDTR, and Save as `index.html` inside that
   folder.
3. Open it in Chrome and play it all the way through. Get one wrong on purpose -
   does it show you the right answer?
4. Play it again, keyboard only: Tab to an answer, press Enter.

::: tree
alt: Folder diagram. The vibe-coding folder contains the app folders from earlier chapters and a new quiz folder holding index.html.
caption: One file, like always.
vibe-coding/
├── ...
├── star-catcher/
└── quiz/
    └── index.html   [[← this lab]]
:::

**Then hand it over.** Give the quiz to somebody - in person, or put it online
and send the link. Watch them play without helping. Where do they hesitate?
:::

::: read
::: q
**Open `index.html` in TXTEDTR and find your five questions.** Where did the AI
put them? All together, or spread out? How many places did you have to look?
---
There is no wrong answer here - just write down what you found. Some AIs put
the questions in one tidy list, some write each one into the page as its own
block, some scatter the questions in one place and the right answers somewhere
else. Hold that thought. The next lab is about exactly this.
:::

::: q
**How does the quiz know which answer is right?**
---
Somewhere in the file, each question is paired with its right answer. It might
be a word like `correct` or `answer` next to the question, a number saying
*the second choice*, or a letter tucked into the HTML. Find it. If somebody
wanted to change a right answer, that is the spot they would have to find too.
:::

::: q
**Play twice. Are the right answers always in the same position?**
---
If the right answer is always the first choice - or always the same letter - a
player figures that out by the third question. A good quiz shuffles the choices
each time. If yours does not, that is your first change below.
:::
:::

::: yours
Make it feel like *your* topic:

::: prompt
Give the quiz a look that matches the topic: colors, a big title, and a short line under it. Shuffle the answer choices every time a question is shown. Keep everything else exactly the same.
:::

Or say it your own way - *add a picture at the top*, *show my score as I go*,
*make the right answer flash green with a check mark*.
:::

::: grow
One at a time:

- **A timer.** *"Give me 15 seconds per question, with a countdown bar. If time
  runs out it counts as wrong."* Then ask yourself what a timer does to somebody
  who reads slowly or uses a screen reader, and ask for *"a setting to switch the
  timer off."*
- **Explain the answers.** *"After each question, show one sentence explaining
  why the right answer is right."*
- **Shuffle the questions too**, so the quiz is never the same twice.
:::

::: keep
Your quiz is `vibe-coding/quiz/index.html`.

**Want it online?** Drag the `quiz` folder onto your repository on
`github.com`, and send the link to the person who knows the topic best. Can they
beat you?

**Write down** how many places your questions ended up in. You will need it in
the next lab.
:::

::: trouble
**The page is blank after I added or changed a question.**

Almost always a missing quote mark or comma. Open the Developer Console: the red
line says which line the problem is on. Copy it into the chat.
---
**A question with an apostrophe broke everything.**

Words like *don't* or *Dave's* contain a `'`, which can look like the end of the
text to JavaScript. Tell the AI: *"a question with an apostrophe breaks the
quiz - make sure apostrophes in questions and answers are handled."*
---
**I can click a second answer and score twice.**

Ask for *"once I have answered a question, lock the choices until I move on."*
---
**The score is wrong at the end.**

Tell the AI exactly what happened: *"I got all five right and it said 4 out of
5."* A precise description gets a precise fix.
:::
