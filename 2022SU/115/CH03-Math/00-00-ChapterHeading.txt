<div id="ch03Button" onclick="ch03ContentsToggle()">

<CENTER>

^^ CHAPTER 3 - Math
<br />&#9660;

</CENTER>

</div>

<div id="ch03Contents" style="display:block;">

# What to expect

In this chapter we will examine some of the most fundamental things about Java and math. Think you know a lot about math? I mean, I hope you do, but you going to have to rethink some of your basic assumptions. For instance, 5/2 in Java isn't 2.5, it's 2. But 5/2.0 is 2.5. Bonkers, right? 

You'll also learn some other less-known math stuff that exists in the real world. For instance, *modulo* (which is like division but only focused on the remainder, not the number of times one number goes into another number). And *casting* which is when you tell the computer, "Listen, I know this number is a whole number but for this one time can you pretty please treat it as a decimal?".

Good times.


# Schedule

<iframe src='https://docs.google.com/spreadsheets/d/e/2PACX-1vQosxGgDcakc-fNCrEbEMxFwQpClqJzWinUcbuJ9lZpbPtb3V5LYil0B5Oe98VpkpypvxeafQxkyH93/pubhtml/sheet?headers=false&amp;gid=1499791358&amp;range=A1:D8'style="width:100%;max-width:720px;height:225px" frameborder="0"></iframe>

# To ponder

In the meantime, ponder what you think this code might do:


```java

System.out.println(10/2);
System.out.println(10/2.0);

```

<br /><br />

</div>

<script>
function ch03ContentsToggle() {
  var content = document.getElementById("ch03Contents");
  if (content.style.display === "none") {
    content.style.display = "inline-block";
  } else {
    content.style.display = "none";
  }
}
</script>





