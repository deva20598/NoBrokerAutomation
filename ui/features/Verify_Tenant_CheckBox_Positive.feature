@possitive

Feature: Ensure the Male Tenant Filter Checkbox is Checked

Scenario: USER OPEN NO BROKER APPLICATION - VERIFY SUCCESSFULLY OPEN THE APPLICATION
Given user opens the No Broker application URL
Then  verify the user has successfully opened the application

Scenario: USER SEARCH LOCATION
Then  user select property type
And   user select location as "madh"

Scenario: USER SELECT LIVING PROPERTY TYPE
Then  user select living arrangements as "Flatmates"
And   user select tenant type as "Male"
And   user select room type as "Single Room"

Scenario: USER SEARCH THE PROPERTY
When  user search the property

Scenario: USER VERIFY MALE CHECK BOX SELECTED
Then  user verify tenant type "Male" check box is selected

Scenario: TEARDOWN
Given   session is closed