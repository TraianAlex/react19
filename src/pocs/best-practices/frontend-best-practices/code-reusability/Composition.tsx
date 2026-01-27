import { ReactNode } from 'react';

const Composition = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>26. Composition Over Inheritance</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Composition</h5>
            </div>
            <div className='card-body'>
              <GoodApproach />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Explanation</h5>
            </div>
            <div className='card-body'>
              <p>
                Prefer composition and component composition over inheritance. Composition allows 
                you to build complex UIs from simpler, reusable components.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Composition
const Layout = ({ header, sidebar, content }) => (
  <div>
    <header>{header}</header>
    <aside>{sidebar}</aside>
    <main>{content}</main>
  </div>
);

// Usage
<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<Content />}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Composition
interface LayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

const Layout = ({ header, sidebar, content }: LayoutProps) => {
  return (
    <div className='border rounded p-3'>
      <header className='mb-3 border-bottom pb-2'>{header}</header>
      <div className='row'>
        <aside className='col-md-3 border-end pe-3'>{sidebar}</aside>
        <main className='col-md-9 ps-3'>{content}</main>
      </div>
    </div>
  );
};

const Header = () => <h5 className='mb-0'>Header Component</h5>;
const Sidebar = () => (
  <div>
    <h6>Sidebar</h6>
    <ul className='list-unstyled'>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
);
const Content = () => (
  <div>
    <h6>Main Content</h6>
    <p className='mb-0'>This is the main content area.</p>
  </div>
);

const GoodApproach = () => {
  return (
    <div>
      <Layout
        header={<Header />}
        sidebar={<Sidebar />}
        content={<Content />}
      />
      <small className='text-muted mt-2 d-block'>
        Benefits: Flexible, reusable components, easy to modify, no inheritance complexity
      </small>
    </div>
  );
};

export default Composition;
