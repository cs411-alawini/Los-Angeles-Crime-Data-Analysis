## 1. Description of data stored in the database:
- **Source**: The data comes from the "[2020 Present Los Angeles Crime Data](https://www.kaggle.com/datasets/susant4learning/crime-in-los-angeles-data-from-2020-to-present?resource=download&select=Crime_Data_from_2020_to_Present.csv)" dataset.
- **Attribute**: The database stores attributes such as DR_NO (unique report number), Date Reported, Date of Occurrence, Time of Occurrence, Reporting Area and its name, Crime Codes and their descriptions, Victim details like age, gender, and descent, Premise details, Weapon details, Crime Status, Location details including latitude and longitude, and more.

## 2. Basic functions of Web applications:
- **View Crime Data**: Users can view crimes based on different filters (such as date, region, or crime type).
- **Demographic Analysis**: Users can analyze the relationship between the victim's demographic data and the type of crime.
- **Analysis of Crime Severity and Impact**: Prioritize and classify crimes based on their severity or impact.
- **Feedback and Reporting**: Community members can provide feedback or report suspicious activities.

Future Development Plan:

- **Predictive Analysis**: Use historical data to predict potential criminal trends or hotspots in the future.

## 3. Creative components for enhanced functionality:
- **Interactive data visualization**: Implement advanced data visualization tools that allow users to interactively explore crime data. For example, users can zoom in on specific communities on the map, view crime trends over a period of time, and even compare crime rates in different regions.
- **Community participation and collaboration**: Integrate a feature that allows local community members to collaborate in community observation plans, share personal safety tips, and even organize community-based crime prevention activities. This will be facilitated through forums or community committees within the application.
- **Personalized user dashboard**: Users can customize the dashboard to monitor specific areas of interest, track specific types of crimes, and even set alerts for certain crime thresholds. For example, if the number of burglaries in a user's community exceeds a certain amount within a month, the user can set an alarm.
- **A crime prevention suggestion system with location-based alerts**: Based on user profiles, their frequent locations, and real-time data, the system can send location-based alerts and recommend tailored crime prevention tips and resources. For example, if users plan to visit areas with recent theft reports, they may receive security alerts to protect their items. In addition, for users with specific concerns, such as parents of young children, the platform can provide safety advice for children.

## 4. Project Name:
- **Los Angeles Crime Insight**: Visualization and Analysis Crime in Los Angeles

## 5. Project Overview:
- LA Crime Insights is a web-based application designed to provide a comprehensive overview of crime in Los Angeles since 2020. By utilizing detailed crime data, the platform provides users with insights on crime trends, population impact, and predictive analysis. This application has various functions, from demographic analysis to crime prediction, providing residents with the knowledge and resources they need to safely drive the city.

## 6. Application Description:
- The core of "Los Angeles Crime Insight" is to serve as a comprehensive center for understanding and analyzing the dynamics of crime in Los Angeles. It combines complex data analysis with a user-friendly interface to provide insights on crime types, affected demographics, high-risk areas, and potential future threats. This application prioritizes public safety and awareness by providing data in an accessible manner and cultivating community collaboration awareness. Users can delve into specific regions, analyze population impacts, and even obtain customized security recommendations based on personal information and preferences.

## 7. Usefulness:
- Although multiple crime map websites and applications are available, such as "CrimeMapping" and "Neighborhood Scout", "LA Crime Insights" stands out due to its detailed demographic analysis, prediction functions, and user-centric features such as customized crime prevention tips. Our platform not only provides data, but also actionable insights and resources.

## 8. Authenticity:

- The foundation of "Los Angeles Crime Insight" is a real and comprehensive dataset called "[2020 Present Los Angeles Crime Data](https://www.kaggle.com/datasets/susant4learning/crime-in-los-angeles-data-from-2020-to-present?resource=download&select=Crime_Data_from_2020_to_Present.csv)". This dataset provides a panoramic view of reported crimes across Los Angeles, including details of events, victims, and geographical nuances. By relying on this dataset, our platform ensures that all insights, analyses, and predictions are rooted in real-world events and patterns. This commitment to authenticity ensures that our users receive accurate and timely information, making our platform a reliable source of insights related to crime in Los Angeles.

## 9. User Interface
**Crime data page**
![Local Image](page1.png)

**Demographic Analysis Page**
![Local Image](page2.png)

**Crime Severity and Impact Page**
![Local Image](page3.png)

**Feedback and Report Page**
![Local Image](page4.png)

## 10. Work Distribution

 **Xixiang: Frontend and UI Design**

- Design the overall layout and aesthetic of the web application, ensuring it's user-friendly and intuitive.
- Implement interactive data visualization tools, allowing users to explore crime data dynamically.
- Develop the personalized user dashboard, allowing users to customize their views and set alerts.
- Ensure the application is responsive and optimized for various screen sizes and devices.

**Haobai: Server with RESTful Services (API)**

- Set up and maintain the server infrastructure to support the web application.
- Develop RESTful services to fetch data from the database and serve it to the frontend.
- Handle the "Feedback and Reporting" feature, ensuring that community feedback is captured and stored correctly.

**Tiansu: Database Design**

- Set up and maintain the database that stores the "2020 Present Los Angeles Crime Data".
- Design the database schema to efficiently store attributes like DR_NO, Date Reported, Victim details, Location details, etc.
- Implement efficient querying mechanisms to support the application's analysis features, such as Demographic Analysis and Analysis of Crime Severity and Impact.
- Ensure data integrity, backups, and recovery mechanisms are in place.

**Jiawei: Other Backend**

- Implement the logic for predictive analysis, utilizing historical data to forecast potential criminal trends.
- Develop the crime prevention suggestion system, which provides location-based alerts and recommendations to users.
- Handle the community participation and collaboration feature, facilitating forums or community committees within the application.
- Collaborate with Tiansu on database interactions and with Haobai on server-side operations to ensure seamless integration and functionality.
