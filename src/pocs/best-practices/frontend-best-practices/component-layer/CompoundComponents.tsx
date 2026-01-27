import { useState, createContext, useContext, ReactNode } from 'react';

const CompoundComponents = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>5. Compound Components</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Compound component pattern</h5>
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
                Create components that work together as a unit while maintaining flexibility.
                Compound components allow you to build complex UI patterns with a clean API.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Compound component pattern
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children }) => <div className="tabs-list">{children}</div>;
Tabs.Tab = ({ index, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === index ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
</Tabs>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Compound component pattern
interface TabsContextType {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
}

const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children }: { children: ReactNode }) => (
  <div className='nav nav-tabs mb-3'>{children}</div>
);

Tabs.Tab = ({ index, children }: { index: number; children: ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Tab must be used within Tabs');
  const { activeTab, setActiveTab } = context;
  return (
    <button
      className={`nav-link ${activeTab === index ? 'active' : ''}`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = ({ index, children }: { index: number; children: ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Panel must be used within Tabs');
  const { activeTab } = context;
  if (activeTab !== index) return null;
  return <div className='tab-content'>{children}</div>;
};

const GoodApproach = () => {
  return (
    <div>
      <Tabs>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
          <Tabs.Tab index={2}>Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>
          <div className='card'>
            <div className='card-body'>Content for Tab 1</div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel index={1}>
          <div className='card'>
            <div className='card-body'>Content for Tab 2</div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel index={2}>
          <div className='card'>
            <div className='card-body'>Content for Tab 3</div>
          </div>
        </Tabs.Panel>
      </Tabs>
      <small className='text-muted mt-2 d-block'>
        Benefits: Flexible composition, clean API, components work together seamlessly
      </small>
    </div>
  );
};

export default CompoundComponents;
