export type fileStructureType = {
  id: string;
  name: string;
  type: string;
  parentId: string;
  childrenId: {
    id: string;
    type: string;
  }[];
  content?: string;
};

export const fileStructure: fileStructureType[] = [
  {
    id: "home",
    name: "~",
    type: "directory",
    parentId: "",
    childrenId: [
      {
        id: "about",
        type: "directory",
      },
      {
        id: "pages",
        type: "directory",
      },
      {
        id: "app.txt",
        type: "file",
      },
    ],
  },
  {
    id: "about",
    name: "about",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "ayroid.txt",
        type: "file",
      },
      {
        id: "skills.txt",
        type: "file",
      },
      {
        id: "resume",
        type: "directory",
      },
    ],
  },
  {
    id: "ayroid.txt",
    name: "ayroid.txt",
    type: "file",
    parentId: "about",
    childrenId: [],
    content: `I'm Ayush Singh Kushwah,
a Full Stack Developer and Aspiring DevOps
I'm a Final Year BTech Computer Science student specializing in DevOps at the University of Petroleum and Energy Studies.

Passionate about Full Stack Development and DevOps, I thrive on building innovative solutions. With a commitment to sharing knowledge, I actively contribute to the open-source ecosystem.`,
  },
  {
    id: "skills.txt",
    name: "skills.txt",
    type: "file",
    parentId: "about",
    childrenId: [],
    content: `
<div class="skills-list">
    <div class="skill-category">
        <i>Languages:</i> JavaScript, TypeScript, Python, Java, C++, C
    </div>

    <div class="skill-category">
        <i>Frontend:</i> React, Redux, HTML, CSS, Bootstrap, Material-UI
    </div>

    <div class="skill-category">
        <i>Backend:</i> Node.js, Express, Django
    </div>

    <div class="skill-category">
        <i>Databases:</i> MongoDB, MySQL, SQLite
    </div>

    <div class="skill-category">
        <i>Tools:</i> Git, Docker, Jenkins, Kubernetes, AWS, Azure, GCP
    </div>

    <div class="skill-category">
        <i>DevOps:</i> CI/CD, Jenkins, Docker, Kubernetes, Helm, Terraform, Ansible, Prometheus, Grafana, ELK Stack
    </div>
</div>
`,
  },
  {
    id: "resume",
    name: "resume",
    type: "directory",
    parentId: "about",
    childrenId: [
      {
        id: "resume.pdf",
        type: "file",
      },
    ],
  },
  {
    id: "resume.pdf",
    name: "resume.pdf",
    type: "file",
    parentId: "resume",
    childrenId: [],
    content: "https://drive.google.com/file/d/1",
  },
  {
    id: "projects",
    name: "projects",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "ideos",
        type: "directory",
      },
      {
        id: "visual-rift",
        type: "directory",
      },
    ],
  },
  {
    id: "blogs",
    name: "blogs",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "devops",
        type: "directory",
      },
      {
        id: "development",
        type: "directory",
      },
      {
        id: "system-design",
        type: "directory",
      },
    ],
  },
];
