layout:
<Header/>
<Breadcrumbs/>
<Sidebar> (бургур меню)
<AuthBar></AuthBar>
<UserBar></UserBar>
</Sidebar>

DashboardPage href="/"
<GreetingBlock></GreetingBlock>
<StatusBlock></StatusBlock>
<BabyTodayCard></BabyTodayCard>
<MomTipCard></MomTipCard>
<TasksReminderCard>
<AddTaskModal></AddTaskModal>
</TasksReminderCard>
<FeelingCheckCard>
<AddDiaryEntryModal><AddDiaryEntryModal>
</FeelingCheckCard>

JourneyPage href="/journey/[weekNumber]"
<GreetingBlock></GreetingBlock>
<WeekSelector></WeekSelector>
<JourneyDetails>
<TasksReminderCard>
<AddTaskModal></AddTaskModal>
</TasksReminderCard>
</JourneyDetails>

DiaryPage href="/diary"
/diary
<GreetingBlock></GreetingBlock>
<DiaryList>
<AddDiaryEntryModal></AddDiaryEntryModal>
<DiaryEntryCard>
<DiaryEntryDetails>
<AddDiaryEntryModal></AddDiaryEntryModal>
<ConfirmationModal></ConfirmationModal>
</DiaryEntryDetails>
</DiaryEntryCard>
</DiaryList>
/diary/[entryId]
<DiaryEntryDetails>
<AddDiaryEntryModal></AddDiaryEntryModal>
<ConfirmationModal></ConfirmationModal>
</DiaryEntryDetails>

ProfilePage href='/profile'
<ProfileAvatar></ProfileAvatar>
<ProfileEditForm></ProfileEditForm>
OnboardingPage href= '/profile/edit'
<OnboardingForm></OnboardingForm>

RegistrationPage href='/auth/register'
<RegistrationForm></RegistrationForm>

LoginPage href='/auth/login'
<LoginForm></LoginForm>

///////////////////////////////COMPONENTS/////////////

Компоненти Технічного завдання:

1. <Header/>
2. <Breadcrumbs/>
3. <Sidebar/> Діана
4. <AuthBar/> Діана
5. <UserBar/> Діана
6. <GreetingBlock/> Лариса
7. <StatusBlock/>
8. <BabyTodayCard/>
9. <MomTipCard/>
10. <TasksReminderCard/>
11. <AddTaskModal/>
12. <FeelingCheckCard/>
13. <AddDiaryEntryModal/>
14. <WeekSelector/> Лариса
15. <JourneyDetails/> Лариса
16. <DiaryList/>
17. <DiaryEntryCard/>
18. <ConfirmationModal/>
19. <DiaryEntryDetails/>
20. <ProfileAvatar/>
21. <ProfileEditForm/> Женя
22. <OnboardingForm/>
23. <RegistrationForm/> Володимир
24. <LoginForm/> Володимир

Допоміжні компоненти:

Modals:
<AddTaskModal></AddTaskModal>
<AddDiaryEntryModal></AddDiaryEntryModal>
<ConfirmationModal></ConfirmationModal>

////////////////////////////

quick file create

````bash
mkdir components/Header
touch components/Header/Header.tsx
```
````
