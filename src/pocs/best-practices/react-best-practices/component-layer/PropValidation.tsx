import PropTypes from 'prop-types';

const PropValidation = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>15. Prop Validation</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: No prop validation</h5>
            </div>
            <div className='card-body'>
              <BadUserCard
                user={{
                  id: 1,
                  name: 'John Doe',
                  email: 'john@example.com',
                  age: 30,
                }}
              />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Prop validation with PropTypes</h5>
            </div>
            <div className='card-body'>
              <GoodUserCard
                user={{
                  id: 1,
                  name: 'John Doe',
                  email: 'john@example.com',
                  age: 30,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h5>TypeScript Example</h5>
            </div>
            <div className='card-body'>
              <TypeScriptUserCard
                user={{
                  id: 1,
                  name: 'Jane Doe',
                  email: 'jane@example.com',
                  age: 25,
                }}
              />
              <div className='mt-3'>
                <small className='text-muted'>
                  TypeScript provides compile-time type checking and serves as documentation.
                  PropTypes provides runtime validation and is useful when not using TypeScript.
                </small>
              </div>
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
                Prop Validation isn't just about catching bugs, but rather about documenting expected 
                usage.
              </p>
              <p>
                Whether it's TypeScript or PropTypes, type safety is more than just preventing bugs. 
                It is a way to communicate clearly. Types serve as documentation for our assumptions 
                and help catch inconsistencies before they make it into production.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: PropTypes for documentation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

// ✅ Good: TypeScript for type safety
interface ButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: No prop validation
const BadUserCard = ({ user }: any) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5>{user.name}</h5>
        <p className='text-muted'>{user.email}</p>
        <p>Age: {user.age}</p>
      </div>
    </div>
  );
};

// ✅ Good: Prop validation with PropTypes
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const GoodUserCard = ({ user }: { user: User }) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5>{user.name}</h5>
        <p className='text-muted'>{user.email}</p>
        <p>Age: {user.age}</p>
      </div>
    </div>
  );
};

// PropTypes for runtime validation
GoodUserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
};

// ✅ Good: TypeScript for compile-time validation
interface TypeScriptUser {
  readonly id: number;
  name: string;
  email: string;
  age: number;
}

interface TypeScriptUserCardProps {
  user: TypeScriptUser;
}

const TypeScriptUserCard = ({ user }: TypeScriptUserCardProps) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5>{user.name}</h5>
        <p className='text-muted'>{user.email}</p>
        <p>Age: {user.age}</p>
      </div>
    </div>
  );
};

export default PropValidation;
