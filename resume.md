tl;dr
=====

|                    |                                                                   |
| ------------------:|:----------------------------------------------------------------- |
| **experience**     | 9 years of experience as a software developer                     |
| **education**      | Bachelors in Computer Science (2008), Masters in Teaching (2013)  |
| **strengths**      | intelligence, creativity, problem-solving, deep/thorough thinking |
| **core languages** | JavaScript/TypeScript, React/ReactNative, C#, SQL, HTML, CSS/SASS |

Professional Experience
=======================

Software Development
--------------------

<div class="title">**SendSwag.com** *2019 - present*</div>
Centennial, Colorado 80122
<div class="job" markdown>

**Web Developer / AWS/S3 Guru**
*   Working with UI specialist/owner of company to get it up and running on AWS

</div>

---

<div class="title">**Warp World** *2019 - present*</div>
Chicago, Illinois 60607
<div class="job" markdown>

**Web Developer**
*   Owner of MultiQueue's WarpBar, Twitch Chat Bot, and Configuration
*   Warp World Re-write for Super Mario Maker 2 Support
    -   Database schema
    -   Backend API
    -   WarpBar

</div>

---

<div class="title">**Bethany Community Church** *2013 - 2018*</div>
Seattle, Washington 98103
<div class="job" markdown>

**Web Developer / Database Manager / SQL Ninja**
*   Independent contractor.
*   Maintenance and improvements of church website and members database.
*   General problem solving for staff members.

</div>

---

<div class="title">**Microsoft** *2008 - 2011*</div>
Redmond, Washington 98052  
<div class="job" markdown>
**Software Development Engineer**
*   SQL Azure front end (TDS proxy in C#) and web portal (ASP.Net v1, Silverlight/C# v2).
*   Artificial intelligence-centric data recommendations project.
</div>

Teaching
--------

<div class="title">**McKnight Middle School** *2013*</div>
Renton, Washington 98056  
<div class="job" markdown>
**Student Teacher**
*   Team taught Math 8 (pre-algebra).
*   In partial fulfillment of Masters in Teaching.
</div>

---

<div class="title">**Western Washington University** *2008*</div>
Bellingham, Washington 98225  
<div class="job" markdown>
**Teaching Assistant / Lab Facilitator**  
*   Taught and graded a lab that teaches students the fundamentals of circuit design and logic.
</div>


Skills
======

Personal strengths
------------------

*   Creative and methodical problem-solving
*   Intuitive comprehension of complex systems
*   Considering every aspect of a problem and potential solutions
*   Articulation and listening
    *   Able to explain complex concepts
    *   Able to figure out what parts of what I'm saying don't make sense to my audience and then explaining in a 
        manner that makes sense to them
*   Writing clearly
*   Genuinely kind, helpful, and generous with my time

Programming language proficiencies
----------------------------------

*   JavaScript / TypeScript 3.x
    -   ECMAScript 6 - 8
    -   NodeJS
        *   Webpack
    -   ReactJS / React Native
    -   jQuery
    -   EJS
    -   Vue (currently learning)
*   HTML 5
    -   Bootstrap 3 and 4
*   CSS
    -   SASS
    -   LESS
*   SQL (T-SQL, MySQL)
*   C#
    -   ASP.Net
    -   Linq
    -   Silverlight
*   C++
*   Python
*   PHP

Education
=========

University
----------

<div class="title">**Western Washington University** *class of 2008*</div>
Bellingham, Washington 98225  
<div class="job" markdown>

*   Graduated with BS in computer science in June 2008.
*   Minor in mathematics.
*   3.57 GPA (does not include credits from AAS).

</div>

---

<div class="title">**Northwest University** *class of 2013*</div>
Kirkland, Washington 98033  
<div class="job" markdown>

*   Graduated with a Masters in Teaching Secondary Education with an emphasis on mathematics.

</div>

Pre-University
--------------

<div class="title">**South Kitsap High School** *class of 2005*</div>
Port Orchard, Washington 98366  
<div class="job" markdown>

*   Diploma.
*   3.8 GPA.

</div>

---

<div class="title"><span>**Olympic College** (via Running Start)</span> *class of 2005*</div>
Bremerton, Washington 98033  
<div class="job" markdown>
*   AAS Degree.
*   3.7 GPA.
</div>

Portfolio / Recent Projects
===========================

Failstream.net
--------------

[Link](https://failstream.net/)

Website and chat bot for Failstream, the Twitch streamer  
[https://twitch.tv/failstream](https://twitch.tv/failstream)

#### Major features ####

<div class="job" markdown>
<div></div>
*   Game submission for 12-hour stream scheduling [link](https://failstream.net/failstravaganza)
*   Twitch chat bot for managing a viewer queue [link](https://failstream.net/mp)  
    (Contact me with a Twitch username if you want to see the mod-only control panel)
</div>

#### Frameworks used ####

<div class="job" markdown>
<div></div>
*   [React.js](https://reactjs.org/)
*   [Bootstrap](http://getbootstrap.com/)
*   [Next.js](https://nextjs.org/)
*   [Express](https://expressjs.com/)
*   [Twitch API](https://dev.twitch.tv/docs/)
*   [Passport](http://www.passportjs.org/)
*   [Twitch-JS](https://github.com/twitch-devs/twitch-js/tree/master)
</div>

Database Unmerge Tool
---------------------

Mission-critical tool used for unmerging wrongfully-merged person records in a 
[Shelby Arena](https://www.shelbysystems.com/solutions/church-management/) database months after the merges occurred.

#### Process ####

<div class="job" markdown>
<div></div>

*   Reads a diff script (~1.3GB) generated with [Redgate Data SQL
    Compare](https://www.red-gate.com/products/sql-development/sql-data-compare/index), a list of incorrectly merged
    person ids, and the table/index data from the SQL Server database
*   Parses the script into a list of statements (which often span multiple SQL statements), indexing with primary and
    foreign key information
*   Filters out all statements referencing the merged person ids
*   Iteratively filters out all statements referencing the previously filtered set of statements

</div>

#### Required skills ####

<div markdown>
*   Significant C# experience
*   Script parsing
    *   Reverse engineering undocumented SQL Server Parser classes
    *   Custom tokenizing of SQL Server statements
    *   Custom grammar for parsing those tokens (using [IronMeta](https://github.com/kulibali/ironmeta))
*   Some WPF/XAML
*   Significant parallelism
*   Significant SQL Server experience
</div>

Pokemon-Soul.Link
-----------------

[Link](http://pokemon-soul.link)

Tool for reading Pokémon ROM memory from an emulator in order to display Pokémon party images and data on stream via OBS
Studio and XSplit.  

It also manages ["Soullink
runs"](https://www.deviantart.com/nuzlockefamily/journal/Soul-Link-Randomized-Nuzlocke-511651842) where multiple players
each run a game at the same time, and when one player's Pokémon dies, their partner's linked Pokémon also dies.  Updates
on both streams' displays are handled automatically and immediately via two Discord bots.

#### Frameworks/technologies used ####
<div class="job" markdown>
<div></div>
*   [Webpack](https://webpack.js.org/)
*   [ejs](https://ejs.co/)
*   [Node.js](https://nodejs.org/en/)
*   [Bootstrap](http://getbootstrap.com/)
*   [Discord.js](https://discord.js.org/#/)
*   Lua scripting
    *   Interfacing with both [DeSmuMe](https://desmume.org/) and
        [VBA-RR](http://tasvideos.org/EmulatorResources/VBA.html) to read in Pokémon info and send it to the node server
*   Server-Sent Events
*   Websockets
</div>

References
==========

(( Contact information removed for privacy ))

Bart Brueck
-----------

**Bethany Community Church**  
Technical Director  
*Most recent long-term boss*

Joe Milan
---------

**SendSwag.com**  
Business Owner / UI Specialist

Matthew "Jaku" Jakubowski
-------------------------

**Warp World**  
Business Owner  
Twitch Streamer  
((Knows me as dx/dt))

James Finnigan
--------------

**Facebook**  
Previously Principle Dev Lead at Microsoft  
((May know me as *Jordan Hitch*))

Lee Marin
---------

**[411-Vision](http://411-vision.com/)**  
Business Owner
((Knows me as *Jordan Hitch*))

Perry Fizzano
-------------

**Western Washington University**  
[Professor and Computer Science Department Chair](https://cse.wwu.edu/computer-science/fizzanp)
((Knows me as *Jordan Hitch*))

Jeremy Delamarter
-----------------

**Northwest University**  
[Assistant Professor of Education](https://www.northwestu.edu/education/faculty/jeremy-delamarter/)  
Masters Degree Professor - Character Reference

# 

!![info]
The content of this page was generated entirely from a static markdown file:
[resume.md](https://github.com/dfoverdx/resume/blob/master/resume.md).
!!