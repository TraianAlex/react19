import PropTypes from 'prop-types';

const PropsApi = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>14. Props: The Component's API</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Hard to understand component requirements</h5>
            </div>
            <div className='card-body'>
              <BadButton
                size='large'
                variant='primary'
                disabled={false}
                onClick={() => alert('Clicked!')}
              >
                Click Me
              </BadButton>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Clear component API</h5>
            </div>
            <div className='card-body'>
              <GoodButton
                size='large'
                variant='primary'
                disabled={false}
                onClick={() => alert('Clicked!')}
              >
                Click Me
              </GoodButton>
              <div className='mt-3'>
                <GoodButton variant='secondary' size='small'>
                  Small Button
                </GoodButton>
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
                If you give it a thought, props are essentially a component's public API, isn't it?
              </p>
              <p>
                So they too deserve the same thoughtful design and care we give any public interface. 
                That means considering developer experience, ensuring type safety, and building for 
                extensibility from the start.
              </p>
              <p>
                One simple practice that helps with this is prop destructuring combined with default 
                values. This approach makes your components self-documenting and anyone reading the 
                code can quickly see what props the component expects and what defaults they fall back 
                on. It's a small detail, but it makes a big difference in clarity and usability.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Hard to understand component requirements
const Button = (props) => {
  const size = props.size || 'medium';
  const variant = props.variant || 'primary';
  // ...
};

// ✅ Good: Clear component API
const Button = ({ 
  children,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  onClick,
  ...rest 
}) => {
  // ...
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Hard to understand component requirements
const BadButton = (props: any) => {
  const size = props.size || 'medium';
  const variant = props.variant || 'primary';
  const disabled = props.disabled || false;

  const sizeClasses: Record<string, string> = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg',
  };

  const variantClasses: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  return (
    <button
      className={`btn ${sizeClasses[size]} ${variantClasses[variant]}`}
      disabled={disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

// ✅ Good: Clear component API
interface ButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}

const GoodButton = ({
  children,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) => {
  const sizeClasses: Record<string, string> = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg',
  };

  const variantClasses: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  return (
    <button
      className={`btn ${sizeClasses[size]} ${variantClasses[variant]}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

// PropTypes for runtime validation (if not using TypeScript)
GoodButton.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PropsApi;
