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

AuthPage href='/auth/[authType]'
    Умовний рендер???????
    RegistrationForm href='/auth/register' 
         <RegistrationForm></RegistrationForm>
    LoginForm href='/auth/login'
        <LoginForm></LoginForm>

//////
Modals:
    <AddTaskModal></AddTaskModal>
    <AddDiaryEntryModal></AddDiaryEntryModal>
    <ConfirmationModal></ConfirmationModal>

////////////////////////////
