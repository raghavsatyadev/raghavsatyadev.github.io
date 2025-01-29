# Applied Jobs Web Application

This web application allows users to view and manage job applications by selecting dates and viewing corresponding job details.

## Features

- **Date Selection:** Users can select a date to view job applications submitted on that day.
- **Job Details Display:** For each selected date, the application displays job details including the company name, a brief description, and an "Apply" button.
- **Responsive Design:** The application is designed to be user-friendly and responsive across various devices.

## Project Structure

The project consists of two main HTML files:

1. **index.html:** Displays a list of available dates in a tabular format. Users can select a date to view job applications.
2. **jobs.html:** Displays job details for the selected date, including company name, description, and an "Apply" button.

## Technologies Used

- **HTML5:** Structure of the web pages.
- **CSS3:** Styling and layout of the application.
- **JavaScript (ES6):** Dynamic content rendering and user interaction handling.
- **GitHub API:** Fetching JSON files containing job data.

## Setup and Usage

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/applied-jobs.git
   cd applied-jobs
   ```

2. **Directory Structure:** Ensure that your project has the following structure:

   ```
   applied-jobs/
   ├── index.html
   ├── jobs.html
   ├── appliedjobs/
       └── jsons/
           ├── 29-01-2025.json
           ├── 30-01-2025.json
           └── ...
   ```

3. **Accessing the Application:**

   - Open `index.html` in a web browser to start the application.
   - Select a date to view the corresponding job applications.

## JSON File Format

Each JSON file in the `appliedjobs/jsons/` directory should follow this structure:

```json
[
    {
        "companyName": "Example Company",
        "externalUrl": "https://example.com/job-application",
        "description": "Job description here."
    },
    {
        "companyName": "Another Company",
        "externalUrl": "https://another.com/job-application",
        "description": "Another job description here."
    }
]
```

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) for inspiration on structuring this README.
- [Make a README](https://www.makeareadme.com/) for guidelines on creating effective README files.

