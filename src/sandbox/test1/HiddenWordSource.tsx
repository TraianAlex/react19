import { SECRET_WORD_URL } from './utils';

export const HiddenWordSource = () => (
  <section data-id='92001' hidden aria-hidden='true'>
    <article data-class='payload45'>
      <div data-tag='node78'>
        {SECRET_WORD_URL.split('').map((char, index) => (
          <b
            key={index}
            className='ref'
            ref={(element) => {
              element?.setAttribute('value', char);
            }}
          />
        ))}
      </div>
    </article>
  </section>
);
