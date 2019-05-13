# Jobis
#### team 525
#### Tool for writing personal statement

## index.html
#### main page of jobis. Has login function and tutorial contents.  

## memory.html
#### memory listing page. It lists all existing memories. User can manage the memories in this page.

## project.html
#### project listing page. User can start project or writing draft in this page.

## add_new_memory/add_new_memory.html
#### memory adding page. User can upload a new memory. A new memory requires title, date and importance to be saved.

## View_memory/view_memory.html
#### memory viewing page. User can view edit selected memory, cannot edit it.

## Edit_memory/Edit_memory.html
#### memory editing page. User can edit the selected memory.

## Add_Question/Add_Questions.html
#### first step of project. Once user starts a project, user can upload questions for personal statement.

## Life_chart/life_chart.html
#### second step of project. After uploading questions, user can see the lifechart and write memos.

## Building_Story/Building_Story.html
#### third step of project. User can organize stories for each questions combining several memories.

## select_memory/select_memory.html
#### memory selecting page. In third step, user should select memories to organize story.

## Draft/Draft.html
#### draft writing page. After finish 3 steps of project, user can write a draft for each questions seeing the previous step.

## src
##### has image source file for tutorial and some icons.


# dependencies
#### We do not use any other external tools except JQUERY and font-awesome used in HCI pr assignment.

# Error
In this version, it support only one user { ID: 'testuser1', password: 1234}. Multiple users can login with this account in different computer. And if one computer log-out the 'testuser1', 'testuser1' is logouted in every other computer. So, 
#### you must not logout. 
There can be some error if user fastly press buttons many times because of firebase problem. If error occurs, try to refresh the page or go to previous page and retry. 
