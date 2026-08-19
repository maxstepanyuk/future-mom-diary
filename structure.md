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
        <AddDiaryEntryModal></AddDiaryEntryModal>
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
4. <Sidebar/> Діана
5. <AuthBar/> Діана
6. <UserBar/> Діана
7. <GreetingBlock/>
8. <StatusBlock/>
9. <BabyTodayCard/>
10. <MomTipCard/>
11. <TasksReminderCard/>
12. <AddTaskModal/>
13. <FeelingCheckCard/>
14. <AddDiaryEntryModal/>
15. <WeekSelector/>
16. <JourneyDetails/>
17. <DiaryList/>
18. <DiaryEntryCard/>
19. <ConfirmationModal/>
20. <DiaryEntryDetails/>
21. <ProfileAvatar/>
22. <ProfileEditForm/> Женя
23. <OnboardingForm/>
24. <RegistrationForm/> Володимер
25. <LoginForm/> Володимер

Допоміжні компоненти:



Modals:
    <AddTaskModal></AddTaskModal>
    <AddDiaryEntryModal></AddDiaryEntryModal>
    <ConfirmationModal></ConfirmationModal>

////////////////////////////
