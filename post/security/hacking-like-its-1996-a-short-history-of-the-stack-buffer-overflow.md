---
calendar: security
post_year: 2020
post_day: 15
title: Hacking Like it's 1996 - a short history of the stack buffer overflow.
---
The year was 1996, and it’s the 11th of November. Macarena is topping the charts, Bill Clinton wins his second presidential term, and an article in a very peculiar e-zine is published which would change the world of information security forever. The publication in question was Phrack, an e-zine for and by hackers. The article in question was Aleph One’s “Smashing the Stack for fun and profit”, thus began what many regards as the golden age of software exploitation.

Smashing the stack for fun and profit was the first-ever article to in detail describe the buffer overflow vulnerability. Sure, buffer overflows were already being exploited in the wild prior to the release of Aleph One paper, but it had never been documented to this extent before. A lot has happened since the golden days. We have 64 bit-systems, compiler protections, kernel protections, and so on. While the examples from the paper aren’t possible without some dangerous compiler tweaks, the essence of the stack-based buffer overflow is still the same.

## Buffer Overflows

So, what is a buffer overflow? An easy way to explain it is to imagine a spreadsheet containing a list of items. Each item has an id, a name, and a price. Imagine has implemented a very poor system for updating the items.

Now, what would happen if someone entered in a bunch of A’s while updating the name? Since this terrible spreadsheet app lacks bounds checking on the name, the value of name overflows into the price field. Now the price of the third item is 9 A’s. If we think a little more creatively about this, this means that we are able to write anything we want to the price field by carefully crafting a payload, that allows us to set the price to 1. Now that would be bad for business.

Ok, now we know the essence of what a buffer flow is, but what about the stack?

## The Stack

Imagine a stack of plates, you can put (push) another plate on top of the already stacked plates, and you can remove a plate (pop) from the stack. I won’t go into great detail about how it works, but what you need to know is that each program executed by the operating system has its own stack, but instead of dinner plates the stack stores stack frames. You see, every time a program calls a function, it pushes a new stack frame on the stack. This frame contains the parameters for the function, its variables, and data needed to get back to the previous frame.

## The Return Pointer

An important part of data needed to return from the function is the return pointer. It stores the memory address for where to resume execution after a function has been called. You can think of this part of the stack frame as the price field from the spreadsheet example. If you can overwrite the return pointer, you may redirect the code flow of the program.

## Exploitation

But how do we redirect the code flow? The classic way, as described in smashing the stack, is to use shellcode. Shellcode is raw machine code, which typically executes a command shell. The attack creates the payload, by figuring out how much input is needed in order to overflow the return pointer. This is typically done by trial and error with the aid of a debugger. Next, the attacker uses the debugger to find the location of where the shellcode will end up in memory. If the exploit is successful, it will overflow the return address with the location of the shellcode, start executing the shellcode.

Now a lot has happened since the 90s, and the buffer overflow like it is presented in smashing the stack for fun and profit is no longer exploitable on modern systems. However, as application hardening evolved so did the techniques for exploitation.

The first defense against these sorts of attacks was NX, non-executable stack. This mitigation prevents code being executed in regions of the stack meant for data. This mitigation prevents the use of shellcode on the stack, but from this a very clever trick was discovered.

## Return-To-Libc

As I mentioned, the return pointer has to point to a valid memory address. We cannot redirect code execution to somewhere on the stack, as it is marked as non-executable. But what if we point it to somewhere that already exists? Enter the return-to-libc technique. The concept is simple, we jump to a already existing function that will allow us to get code execution. There's multiple way to do this, but the most popular is to jump to the c library function `system()`.

We can't jump directly into `system()`, as it needs to be called with a useful string such as `/bin/sh`. In order to pull this off, we can leverage program instructions that modify cpu registers or the stack, as long as they are followed by a return instruction. The return instruction moves the stack pointer, meaning that we can chain together multiple instructions, as it will return into the next memory address we supply on the chain. These instructions are known as gadgets. By using this technique, we can write the string `bin/sh` in the register that is used as the first function parameter (on 32-bit systems, functions parameters are pushed onto the stack instead).

## ROP

Actually, we don't even need access to library functions at all. If we chain together enough gadgets in a clever way, we can execute directly by using a system call. This is known as return-oriented programming (ROP) and is actually Turing complete! Meaning we can make the program to behave in any way we desire. Some people have actually implemented programming languages that run on top of a vulnerable program using return-oriented programming!

## Stack Cookies, ASLR and PIE

Further attempts were made to stop exploitation, but they only succeed at making exploitation more involved. Like stack cookies, a special numeric value placed before the return pointer. If you corrupt this value, execution will terminate. However, these can be leaked and in some cases brute-forced.

Next we have ASLR, or address space layout randomization. This mitigations offsets memory addresses with a random value. This can be defeated by leaking addresses in order to calculate the offset.

The last one we're going to cover is Position Independent Executables or PIE for short. This mitigation is used in combination with ASLR. PIE randomly shuffles each section of the program i.e., we no longer know where anything is in memory. This makes leaking a lot more complicated, but it is defeatable by getting the right memory leaks.
