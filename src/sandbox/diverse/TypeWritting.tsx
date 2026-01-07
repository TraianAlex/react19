import { useTypeWritting } from '../../hooks/useTypeWritting';
import stylesModule from './TypeWriting.module.scss';

export const styles = stylesModule as Record<string, string>;

const TypeWritting = ({ words }: { words: string[] }) => {
  const text = useTypeWritting(words);

  return (
    <div className={styles.typewriterContainer}>
      <div className={styles.typewriterWrapper}>
        <h1 className={styles.typewriterText}>
          {text}
          <span className={styles.typewriterCursor}>|</span>
        </h1>
        <div className={styles.typewriterSubtitle}>
          <span className={`${styles.badge} bg-primary`}>Typing Effect</span>
        </div>
      </div>
    </div>
  );
};

export default TypeWritting;
