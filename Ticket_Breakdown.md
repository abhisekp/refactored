# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1  
### Description  
**DB Schema Changes**

| Add/Update/Remove | Table    | Column           | Type                | Description                                         |
|-------------------|----------|------------------|---------------------|-----------------------------------------------------|
| ADD               | `agents` | `field_agent_id` | `VARCHAR(255) NULL` | The custom id of the agent provided by **Facility** |

Add a `field_agent_id` column to the `agents` table.  
> `field_agent_id` is a string that is a unique custom id to each agent provided by the **Facility**.

### Acceptance Criteria  
- [ ] The `agents` table has a new column called `field_agent_id` that is a `VARCHAR(255)` and `NULL`able.
  
### Implementation Details  
- [ ] Create a new migration file with the new column `field_agent_id` to the `agents` table that is `VARCHAR(255)` and `NULL`able.
- [ ] Ensure the migration file is run on the database and is at the end of the other migration files before merging the PR.
  
### Time Estimate  
15 minutes
  
### Effort Estimate
Low
  
## Ticket 2  
### Description  
**PDF Generation**

Update `generateReport` to add the `field_agent_id` to the report.

Wherever `field_agent_id` is `NULL`, it should use the `id` field.

The label for `field_agent_id` should be kept as is for the `id` i.e. `Agent ID`.

Whenever `field_agent_id` is present, the label should have a `*` next to it i.e. `Agent ID*`. (as per compliance)

### Acceptance Criteria  
- [ ] The `generateReport` function returns the PDF with `Agent ID` present for each agent.
- [ ] The generated PDF is correctly formatted visually.
  
### Implementation Details  
- [ ] Update the `generateReport` function to use the `field_agent_id` to the report instead of `id` field of the agents.
- [ ] Update the unit tests and e2e tests to check for the `Agent ID` in the PDF report.

  
### Time Estimate  
3 Hrs
  
### Effort Estimate  
High
  
## Ticket 3  
### Description  
Update `getShiftsByFacility` to return the `field_agent_id` along with the internal db `id` for each agent.
  
### Acceptance Criteria  
- [ ] The `getShiftsByFacility` function returns the `field_agent_id` of the agents.
- [ ] The `getShiftsByFacility` function returns the `id` of the agents.
  
### Implementation Details  
- [ ] Modify the `SELECT` db query to add the `field_agent_id` to the result.
- [ ] Update the unit tests and e2e tests to check for the `field_agent_id` in the result.
  
### Time Estimate  
3 Hrs
  
### Effort Estimate  
Medium
  
## Ticket 4  
### Description  
**Compliance Coordination**

> Labelling for the `field_agent_id` is kept as `Agent ID*` in the PDF report instead of `Agent ID`.
> `field_agent_id` might not be present for all the agents. In that case, it uses `id` field.

Connect with the **facility compliance team** to ensure that the proposed PDF with `Agent ID` and `Agent ID*` is compliant with the **current regulations and visual formatting**.

Modify the PDF generation to ensure that it is compliant with the **current regulations and visual formatting**.

Modify **Ticket 2 (PDF Generation)** to include the changes to the PDF generation based on compliance.
  
### Acceptance Criteria  
- [ ] The **facility compliance team** has approved the proposed PDF with `Agent ID` and the visual formatting.
- [ ] **Ticket 2 (PDF Generation)** has been updated as per the compliance requirements.
  
### Implementation Details  
- [ ] **Email** (mandatory) and _call_ (optional) the **facility compliance team** to ensure that the proposed PDF with `Agent ID` is compliant with the **current regulations and visual formatting**.
  
### Time Estimate  
3 Days
  
### Effort Estimate  
Medium
  