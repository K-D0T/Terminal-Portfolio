import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null); // Create a ref
  const inputRef = useRef(null); // Create a ref for the input field
  // Add a new state for the current directory
  const [dirStack, setDirStack] = useState(['']);

  // Add a data structure for the file system
  const fileSystem = {
    '': ['desktop', 'downloads', 'documents', 'pictures'],
    'downloads': [{ name: 'ascii.txt', 
    content: `
    ___  __                 ________  ________  _________   
    |\\  \\|\\  \\              |\\   ___ \\|\\   __  \\|\\___   ___\\ 
    \\ \\  \\/  /|_  __________\\ \\  \\_|\\ \\ \\  \\|\\  \\|___ \\  \\_| 
     \\ \\   ___  \\|\\__________\\ \\  \\ \\\\ \\ \\  \\\\\\  \\   \\ \\  \\  
      \\ \\  \\\\ \\  \\|__________|\\ \\  \\_\\\\ \\ \\  \\\\\\  \\   \\ \\  \\ 
       \\ \\__\\\\ \\__\\            \\ \\_______\\ \\_______\\   \\ \\__\\
        \\|__| \\|__|             \\|_______|\\|_______|    \\|__|`}],
    'documents': [{ name: 'resume.txt', content: `
Kaiden Thrailkill
Full-Stack Developer
Carrollton, GA 30117  
Phone: 479-228-7621  
Email: Kaiden.Thrailkill@gmail.com  

Professional Summary
  Motivated Full-Stack Developer with solid expertise in
  Python and modern web technologies. Aiming to leverage
  hands-on experience in software development and IT
  solutions to drive innovation, user satisfaction, 
  and efficiency in a forward-thinking team environment.

Websites, Portfolios, Profiles
  LinkedIn: https://www.linkedin.com/in/kaiden-thrailkill-b99430196/
  GitHub: https://www.github.com/K-D0T

Professional Skills: 
  Python, Bootstrap Studio,
  HTML, CSS, JS, SQL, Django,
  GitHub, Git, Linux, AWS

Technical Skills: 
  Strategic Planning, Leadership,
  Data-Driven, Problem Solving,
  Team Collaboration, Creative

Work History

Full Stack Intern, Simmons Foods, Siloam Springs, AR
  June 2023 - July 2023: 
    Streamlined ERP implementation focusing on user testing
    and data migration, ensuring system integrity.
    Leveraged Python for data structuring, improving
    migration accuracy. Advanced professional skills through
    Oracle Learn aligning with the latest industry standards.

Full Stack Intern, Simmons Foods, Siloam Springs, AR
  June 2022 - July 2022: 
    Developed a Django web application to monitor employee
    qualifications across 12 plants, benefiting 1500+ employees.
    Saving an estimated 50 hours weekly. This solution digitized
    job-specific training forms for over 70 positions across 8
    facilities, eliminating paper use. Engineered both front-end
    and back-end components utilizing Django, Python, HTML,
    JavaScript, CSS, Docker, Linux, AWS, GitHub, and SQL
    enhancing operational efficiency.

Athletics IT Student Assistant, University of Arkansas, Fayetteville, AR
  September 2021 - May 2022:
    Troubleshot hardware and software issues, enhancing system
    reliability for students and staff. Registered devices on the
    university network ensuring secure and efficient access.
    Assisted with password and login issues, improving user experience
    and support for various IT resources.

Full Stack Intern, Simmons Foods, Siloam Springs, AR
  June 2021 - July 2021: 
    Developed a Django web application to streamline
    the injury reporting process, facilitating efficient
    data input. Utilized Django, Python, HTML, JavaScript,
    CSS, Docker, Linux, AWS, GitHub, and SQL enhancing
    operational efficiency. Conducted data analytics to
    generate visualizations offering insights into the
    company's financial status.

Education
  Bachelor of Science: Interdisciplinary Studies - Information Systems and Computer Science
    University of West Georgia Carrollton, GA
    Extracurricular Activities: Cheer Team

    ` }],
    'pictures': [{ name: 'schoolsprit.txt', content: `
             .:--.                                 ..--:.             
          .:-=###--.                             ..--*##+-:.          
        ..-+#######--.                         ..--#######+-..        
       .:-*###+.*###*-:.                      .:-*###*.+###*-:.       
      .:=####: . .*###*-:.  ..............  .:-*###*... :####=-.      
      .-*##*..--:. .*###*---===++****++===---+###*. .:--..*###-.      
     .-+###=.-----.  .*########################*.. .-----.-###+-.     
     .-+###:--=#+--:.  :*####################*:  .:--+#=--:###*-.     
     .-+###---=##+---=##########################=---+##=---###+-.     
      :=###+--+##*-*##############################*-*##+--+###=:      
      .-*##*-=#########**+**#####*=-*#####**+**#########=-+##*-.      
      .-+##*-*###########*+---=*+----+#+---=*###########*-*##*-.      
      .-+###*###############*=----=+----=*###############*###+-.      
      .-*########*=:....:-+###*=-+##*--*###*-:....:-*#########-:      
     .-*###=####*++=-..    .:###+####**##-.    ..:-++*####=###*-.     
    .-+###=.*############+.  .-########=.   =#############.-###*-.    
   .-+###+. .###-..=###++##=.  .*####*.  .-*#*=###=..-###:..=###*-.   
  .-*###+.   :##*. .*##*-==##*+-.=##+.:+*##+=-+###. .+##-.  .+###*-:  
.:-*###=--.   .=#+. .-##########################=. .+#=.   .:-=####-:.
:-####=---:.    ....   ..+##*..:##==##:..+##+...  ....    .:---=####--
.-+####*=---:.      .+#####+.  =.    .-. .+#####*.       :---=*####+-.
  :-*#####*---:.      .*###.              .###*.       :---+#####*-:  
   .-=####=----.      -###. ..*########*:. .###=.      :----####=-.   
  .-=####=------:..  .###=     ........     =###.  ..:------=####=-.  
   .-=*######*=----:.+###.  .-*########*:.  .###+.:-----*######*=-.   
     .:--+####-------*##+. -=:..      ..:-=..+##*-------####+=-:.     
       .:-*##+-------*##=.   ..:-====::.     -###-------+##*-:.       
      .:-=*#####*+=--*##=.  :##+======+#*.  .=###---+*######+-:.      
         .:-=*####=--*##*--:*#*++++++++*#=:--*##*---####*+-:.         
            .-=##*---+###=---*##########+---=###+---*##+-.            
           .-=*####*+=*######*+*######*+*######*=+*####*=-.           
             .:-+*########:-=***######***+-:*#######*+-:..            
                .:--+*#####:-#=+:-::-:==#=.*####*+=+-.                
                    .-######**#***###***#*######-==-.                 
                    :-###*+#-.+###***##+.:#**###=:.                   
                    .-###=-*#+-........:+#*-+###-.                    
                    .-+##*---+*########*+---*##+-.                    
                    ..-*###*=------------+*###*-:.                    
                      .-=#########**#########+-.                      
                       ..--+##############+--..                       
                          ...------------:..                                                                

    ` }],
    'desktop': ['environment'],
    'environment': [{ name: 'passwords.txt', content: 'nice try ;)' }],
  };
  useEffect(() => {
  const introText = `
___  __                 ________  ________  _________   
|\\  \\|\\  \\              |\\   ___ \\|\\   __  \\|\\___   ___\\ 
\\ \\  \\/  /|_  __________\\ \\  \\_|\\ \\ \\  \\|\\  \\|___ \\  \\_| 
 \\ \\   ___  \\|\\__________\\ \\  \\ \\\\ \\ \\  \\\\\\  \\   \\ \\  \\  
  \\ \\  \\\\ \\  \\|__________|\\ \\  \\_\\\\ \\ \\  \\\\\\  \\   \\ \\  \\ 
   \\ \\__\\\\ \\__\\            \\ \\_______\\ \\_______\\   \\ \\__\\
    \\|__| \\|__|             \\|_______|\\|_______|    \\|__|

Welcome to the application! Type "help" to get a list of commands.
`;
    setOutput([{ type: 'preformatted', text: introText }]);
  }, []);
  const handleCommand = (event) => {
    if (event.key === 'Enter' && input.trim() !== '') {
      let newOutput = [...output, { type: 'command', text: `root@ubuntu${"/"+dirStack[dirStack.length - 1]} ~ $ ${input}` }];      const commandParts = input.trim().toLowerCase().split(' ');
      const command = commandParts[0];
      const argument = commandParts[1];
  
      switch (command) {
        case 'cat':
          const file = fileSystem[dirStack[dirStack.length - 1]].find(file => file.name === argument);
          if (file) {
            newOutput.push({ type: 'text', text: file.content });
          } else {
            newOutput.push({ type: 'text', text: `No such file: ${argument}` });
          }
          break;
        case 'cd':
          if (argument === '..') {
            if (dirStack.length > 1) {
              setDirStack(dirStack.slice(0, -1));
            } else {
              newOutput.push({ type: 'text', text: `No parent directory` });
            }
          } else if (fileSystem[argument]) {
            setDirStack([...dirStack, argument]);
          } else {
            newOutput.push({ type: 'text', text: `No such directory: ${argument}` });
          }
          break;
        case 'ls':
          const currentDirContents = fileSystem[dirStack[dirStack.length - 1]];
          if (currentDirContents) {
            const dirContentNames = currentDirContents.map(item => typeof item === 'string' ? item : item.name);
            newOutput.push({ type: 'text', text: dirContentNames.join('\n') });
          }
          break;
        case 'help':
          newOutput.push({
            "type": "text",
            "text": `USAGE: <br />
  These are common Kaiden commands used in various situations:<br /><br />
    - about             See what Kaiden is about<br />
    - skills            Check out Kaiden's skills<br />
    - experience        Learn about Kaiden's experience<br />
    - projects          Discover Kaiden's projects<br />
    - education         Find out about Kaiden's education<br />
    - contact           Get in touch with Kaiden<br />
    - clear             Clear the terminal screen<br />
    - ls                Navigate through the file structure<br /><br />`
          });
          break;
        case 'about':
          newOutput.push({
            "type": "text",
            "text":
`I'm Kaiden Thrailkill, a motivated Full-Stack Developer
with expertise in Python and modern web technologies.
Currently based in Carrollton, GA, I aim to leverage
my hands-on experience in software development and IT
solutions to drive innovation, user satisfaction, and 
efficiency in a forward-thinking team environment.`
          }
          );
          break;
        case 'skills':
          newOutput.push({
            "type": "text",
            "text": `Professional Skills\t\tTechnical Skills

- Strategic Planning\t\t- Python\t\t- Django
- Leadership\t\t\t- Bootstrap Studio\t- GitHub
- Data-Driven Decision Making\t- HTML \t\t\t- Git
- Problem Solving\t\t- CSS\t\t\t- Linux
- Team Collaboration\t\t- JavaScript (JS)\t- AWS
- Creativity\t\t\t- SQL`
          });
          break;
        case 'experience':
          newOutput.push({
            "type": "text",
            "text": 
`- I have had multiple internships at 
Simmons Foods in Siloam Springs, AR, where 
I contributed to various projects. These 
include streamlining ERP implementation, 
developing Django web applications to 
monitor employee qualifications and to 
streamline injury reporting processes, 
which saved significant hours and 
reduced paper use. 

- I also worked as an Athletics IT Student
Assistantat the University of Arkansas, 
where I troubleshot hardware and software
issues and assisted with networkand login support.`
          }          
          );
          break;
        case 'projects':
          newOutput.push({
            "type": "text",
            "text": 
`Projects:

- Developed a Django web application to monitor employee 
qualifications across 12 plants, benefiting over 1500 
employees and saving an estimated 50 hours weekly.

- Developed a Django web application to streamline 
the injury reporting process, facilitating efficient
data input and improving operational efficiency.

- Developed a Django web application for cheerleaders
to find private coaching in their areaand for coaches
to advertise their services.`
          });
          break;
        case 'education':
          newOutput.push({
            "type": "text",
            "text": 
`I have recived a Bachelor of Science
in Interdisciplinary Studies with a focus on 
Information Systems and Computer Science
from the University of West Georgia. 
I graduated in May 2024. 
I was also a member of the Cheer Team.`
          }
          );
          break;
        case 'contact':
          newOutput.push({ type: 'text', 
          text: "Contact me at: kaiden.thrailkill@gmail.com", 
          }
        );
          break;
        case 'clear':
          newOutput = [];
          break;
          
        default:
          newOutput.push({ type: 'text', text: `No command found for: ${input}` });
      }
      setOutput(newOutput);
      setInput('');


    }
  };

  useEffect(() => {
    if (terminalRef.current) { // Check if the ref is assigned
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]); // Run the effect whenever the output changes

  return (
    <div className="App">
      <header className="App-header">
        <div id="terminal" className="terminal" ref={terminalRef} onClick={() => inputRef.current.focus()}>
          <div class="terminal-header">
            <div class="terminal-header-buttonred">🔴</div>
            <div class="terminal-header-buttonyellow">🟡</div>
            <div class="terminal-header-buttongreen">🟢</div>
            <div class="terminal-header-title">K-Dot@ubuntu</div>
          </div>
          <div id="output" className="output">
          {output.map((item, index) => {
            switch (item.type) {
              case 'preformatted':
                return (
                  <pre key={index} style={{ color: '#00FF00' }}>
                    {item.text}
                  </pre>
                );
              case 'command':
                return <div key={index} className="command">{item.text}</div>;
              case 'text':
                return <div key={index} className="text" dangerouslySetInnerHTML={{ __html: item.text }}></div>;
              case 'list':
                return <ul key={index} className="list" dangerouslySetInnerHTML={{ __html: item.link }}>{item.items.map((it, idx) => <li key={idx}>{it}</li>)}</ul>;
              case 'link':
                return <a key={index} className="link" href={item.href} target="_blank" rel="noopener noreferrer">{item.text}</a>;
              default:
                return null;
            }
          })}
          </div>
          <div className="input-line">
            <span className="prompt">{`root@ubuntu${"/"+dirStack[dirStack.length - 1]} ~ $`}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
