// src/utils/stylesStandardiser.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class IonicStyleStandardiser {
    constructor() {
        this.styleReplacements = [
            // Margin replacements
            { pattern: /style=\{\{\s*marginTop:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-margin-top"' },
            { pattern: /style=\{\{\s*marginBottom:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-margin-bottom"' },
            { pattern: /style=\{\{\s*marginLeft:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-margin-start"' },
            { pattern: /style=\{\{\s*marginRight:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-margin-end"' },
            { pattern: /style=\{\{\s*margin:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-margin"' },

            // Padding replacements
            { pattern: /style=\{\{\s*padding:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-padding"' },
            { pattern: /style=\{\{\s*paddingTop:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-padding-top"' },
            { pattern: /style=\{\{\s*paddingBottom:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-padding-bottom"' },
            { pattern: /style=\{\{\s*paddingLeft:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-padding-start"' },
            { pattern: /style=\{\{\s*paddingRight:\s*['"](\d+)px['"]\s*\}\}/g, replacement: 'className="ion-padding-end"' },

            // Text alignment
            { pattern: /style=\{\{\s*textAlign:\s*['"]center['"]\s*\}\}/g, replacement: 'className="ion-text-center"' },
            { pattern: /style=\{\{\s*textAlign:\s*['"]left['"]\s*\}\}/g, replacement: 'className="ion-text-left"' },
            { pattern: /style=\{\{\s*textAlign:\s*['"]right['"]\s*\}\}/g, replacement: 'className="ion-text-right"' },
        ];
    }

    /**
     * Process a single TSX file and convert inline styles to Ionic standards
     */
    processFile(filePath) {
        try {
            let content = fs.readFileSync(filePath, 'utf-8');
            const originalContent = content;

            // Step 1: Replace inline style attributes with className
            content = this.replaceInlineStyles(content);

            // Step 2: Convert style objects to classNames (before div replacement)
            content = this.convertStyleObjectsToClasses(content);

            // Step 3: Replace div elements with appropriate Ionic components
            content = this.replaceDivElements(content);

            // Step 4: Remove any remaining divs
            content = this.removeRemainingDivs(content);

            // Step 5: Ensure proper imports
            content = this.ensureImports(content);

            // Only write if content changed
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`✅ Updated: ${filePath}`);
                return true;
            } else {
                console.log(`⏭️  Skipped (no changes): ${filePath}`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
            return false;
        }
    }

    /**
     * Replace inline style attributes with Ionic className utilities
     */
    replaceInlineStyles(content) {
        let result = content;

        // Replace simple style props with className
        this.styleReplacements.forEach(({ pattern, replacement }) => {
            result = result.replace(pattern, replacement);
        });

        return result;
    }

    /**
     * Convert complex style objects to className
     */
    convertStyleObjectsToClasses(content) {
        let result = content;

        // Match style={{ ... }} blocks and convert to className
        const styleObjectPattern = /style=\{\{([^}]+)\}\}/g;

        result = result.replace(styleObjectPattern, (match, styleContent) => {
            const classes = [];

            // Parse the style object
            if (styleContent.includes('marginTop')) classes.push('ion-margin-top');
            if (styleContent.includes('marginBottom')) classes.push('ion-margin-bottom');
            if (styleContent.includes('marginRight')) classes.push('ion-margin-end');
            if (styleContent.includes('marginLeft')) classes.push('ion-margin-start');
            if (styleContent.includes('padding')) classes.push('ion-padding');
            if (styleContent.includes('textAlign')) {
                if (styleContent.includes('center')) classes.push('ion-text-center');
                if (styleContent.includes('left')) classes.push('ion-text-left');
                if (styleContent.includes('right')) classes.push('ion-text-right');
            }
            if (styleContent.includes('flex: 1') || styleContent.includes('flex:1')) classes.push('ion-flex-1');
            if (styleContent.includes('display')) classes.push('ion-hide'); // placeholder

            // If we found replacements, return className, otherwise remove the style
            return classes.length > 0 ? `className="${classes.join(' ')}"` : '';
        });

        return result;
    }

    /**
     * Replace div elements with appropriate Ionic components
     */
    replaceDivElements(content) {
        let result = content;

        // Replace slot="content" divs (used in accordions) - keep these as divs but clean them
        // These are fine to keep as div since they're in slot attributes

        // Replace flex divs with IonButtons (for button groups)
        result = result.replace(
            /<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*gap:\s*['"](\d+)px['"][^}]*\}\}>\s*(.*?<IonButton.*?<\/IonButton>.*?)\s*<\/div>/gs,
            '<IonButtons className="ion-padding">\n          $2\n        </IonButtons>'
        );

        // Replace colored background divs with IonCard
        result = result.replace(
            /<div style=\{\{[^}]*background:\s*['"]#f0f7ff['"][^}]*\}\}>(.*?)<\/div>/gs,
            '<IonCard color="light" className="ion-margin-bottom">\n          <IonCardContent>$1</IonCardContent>\n        </IonCard>'
        );

        result = result.replace(
            /<div style=\{\{[^}]*background:\s*['"]#ecfdf5['"][^}]*\}\}>(.*?)<\/div>/gs,
            '<IonCard color="success" className="ion-margin-bottom">\n          <IonCardContent>$1</IonCardContent>\n        </IonCard>'
        );

        result = result.replace(
            /<div style=\{\{[^}]*background:\s*['"]#fffbeb['"][^}]*\}\}>(.*?)<\/div>/gs,
            '<IonCard color="warning" className="ion-margin-bottom">\n          <IonCardContent>$1</IonCardContent>\n        </IonCard>'
        );

        // Replace ul/li with IonList/IonItem
        result = result.replace(
            /<ul([^>]*)>/g,
            '<IonList$1>'
        );
        result = result.replace(/<\/ul>/g, '</IonList>');

        result = result.replace(
            /<li>(.*?)<\/li>/gs,
            '<IonItem>\n            <IonLabel className="ion-text-wrap">\n              <p>$1</p>\n            </IonLabel>\n          </IonItem>'
        );

        // Replace standalone p tags with style
        result = result.replace(
            /<p style=\{[^}]*\}>([^<]+)<\/p>/g,
            '<IonText><p>$1</p></IonText>'
        );

        return result;
    }

    /**
     * Remove remaining divs and replace with IonText or remove entirely
     */
    removeRemainingDivs(content) {
        let result = content;

        // Replace divs with className with IonText
        result = result.replace(
            /<div className="([^"]*)">(.*?)<\/div>/gs,
            (match, className, innerContent) => {
                // Keep slot="content" divs
                if (match.includes('slot=')) {
                    return match;
                }
                // If it contains block elements, just remove the div wrapper
                if (innerContent.includes('<IonCard') ||
                    innerContent.includes('<IonButton') ||
                    innerContent.includes('<IonList') ||
                    innerContent.includes('<IonItem')) {
                    return innerContent;
                }
                // Otherwise wrap in IonText
                return `<IonText className="${className}">${innerContent}</IonText>`;
            }
        );

        // Replace divs without className
        result = result.replace(
            /<div>(.*?)<\/div>/gs,
            (match, innerContent) => {
                // Keep slot="content" divs
                if (match.includes('slot=')) {
                    return match;
                }
                // If it contains block elements, just remove the div wrapper
                if (innerContent.includes('<IonCard') ||
                    innerContent.includes('<IonButton') ||
                    innerContent.includes('<IonList') ||
                    innerContent.includes('<IonItem') ||
                    innerContent.includes('<IonText') ||
                    innerContent.includes('<strong') ||
                    innerContent.includes('<br')) {
                    return innerContent;
                }
                // Otherwise wrap in IonText
                return `<IonText>${innerContent}</IonText>`;
            }
        );

        // Remove any self-closing divs
        result = result.replace(/<div\s*\/>/g, '');

        return result;
    }

    /**
     * Ensure necessary Ionic imports are present
     */
    ensureImports(content) {
        const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]@ionic\/react['"]/);

        if (!importMatch) return content;

        const existingImports = importMatch[1]
            .split(',')
            .map(i => i.trim())
            .filter(i => i.length > 0);

        const requiredImports = [
            'IonButtons',
            'IonText',
            'IonList',
        ];

        const missingImports = requiredImports.filter(
            imp => !existingImports.includes(imp)
        );

        if (missingImports.length > 0) {
            const allImports = [...new Set([...existingImports, ...missingImports])].sort();
            const newImportsString = allImports.join(',\n  ');

            return content.replace(
                /import\s+{[^}]+}\s+from\s+['"]@ionic\/react['"]/,
                `import {\n  ${newImportsString}\n} from '@ionic/react'`
            );
        }

        return content;
    }

    /**
     * Process all TSX files in a directory recursively
     */
    processDirectory(dirPath) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        let updatedCount = 0;
        let skippedCount = 0;

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                // Skip node_modules and other non-source directories
                if (!['node_modules', '.git', 'dist', 'build', '.idea'].includes(entry.name)) {
                    const result = this.processDirectory(fullPath);
                    updatedCount += result.updated;
                    skippedCount += result.skipped;
                }
            } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
                const updated = this.processFile(fullPath);
                if (updated) {
                    updatedCount++;
                } else {
                    skippedCount++;
                }
            }
        }

        return { updated: updatedCount, skipped: skippedCount };
    }
}

// CLI execution
const standardiser = new IonicStyleStandardiser();
const srcPath = path.join(process.cwd(), 'src');

console.log('🚀 Starting Ionic style standardization...\n');
const result = standardiser.processDirectory(srcPath);
console.log(`\n✨ Standardization complete!`);
console.log(`   Updated: ${result.updated} files`);
console.log(`   Skipped: ${result.skipped} files`);

export default IonicStyleStandardiser;