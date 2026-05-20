const requiredPages = [
  {
    title: "Start page",
    description:
      "Create a homepage that introduces the shop and helps users start browsing products.",
  },
  {
    title: "Search page",
    description:
      "Build a product search experience using the DummyJSON products API.",
  },
  {
    title: "Product page",
    description:
      "Show product details for a selected item, including the information you find most relevant.",
  },
  {
    title: "Cart",
    description:
      "Allow users to add at least one product to a simple cart and review their selection.",
  },
];

const expectations = [
  "Use React and Vite as the starting point.",
  "Use the DummyJSON products API as your data source.",
  "No styling, component, or data-fetching packages are included by default.",
  "Choose your own routing, state, styling, and data-fetching approach.",
  "Focus on fundamentals, engineering judgment, and the tradeoffs you make.",
];

const evaluationPoints = [
  "How you break the problem down and decide where to start.",
  "How you justify package, component, and architecture choices.",
  "How you communicate tradeoffs, assumptions, and next steps.",
  "How you balance simplicity, readability, and product thinking.",
];

const timeboxNotes = [
  "Aim to spend around 2-4 hours on this assignment.",
  "With solid package choices and AI assistance, that should be enough to show your approach.",
  "A well-reasoned, incomplete solution is better than an overbuilt one.",
];

const submissionNotes = [
  "Keep your commit history intact.",
  "Add setup instructions to the README.",
  "Include a short note about your main technical decisions, tradeoffs, and what you would do next.",
  "If you used AI tools, briefly describe how you used them.",
];

function AssignmentBriefPage() {
  return (
    <main className="assignment-page">
      <section className="hero-panel">
        <p className="eyebrow">Frontend take-home assignment</p>
        <h1>Build a small React webshop</h1>
        <p className="lead">
          This repository is intentionally minimal. The goal is not to follow a
          fixed recipe, but to show how you structure a small product
          experience, make technical decisions, and communicate your tradeoffs.
          This should create a good conversation, not reward polish for its own
          sake.
        </p>

        <div className="resource-links">
          <a
            href="https://dummyjson.com/docs/products"
            target="_blank"
            rel="noreferrer"
          >
            DummyJSON products docs
          </a>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            React docs
          </a>
          <a href="https://vite.dev/" target="_blank" rel="noreferrer">
            Vite docs
          </a>
        </div>
      </section>

      <section className="brief-panel">
        <div className="brief-panel-heading">
          <h2>Required pages</h2>
          <p>
            Cover these four surfaces in the way you think makes the most sense.
          </p>
        </div>

        <div className="brief-grid">
          {requiredPages.map((page) => (
            <article className="brief-card" key={page.title}>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-panel brief-panel-split">
        <article>
          <h2>Expectations</h2>
          <ul>
            {expectations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <h2>What matters most</h2>
          <ul>
            {evaluationPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <h2>Submission notes</h2>
          <ul>
            {submissionNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="brief-panel">
        <h2>Timebox</h2>
        <ul>
          {timeboxNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="brief-note">
        <strong>Starter scope:</strong> this template only wires up React,
        Vite, and a single <code>/</code> route so package and component choices
        stay open.
      </section>
    </main>
  );
}

export default AssignmentBriefPage;