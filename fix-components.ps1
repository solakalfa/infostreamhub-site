# List of component files to fix
$files = @(
    "src\components\cards\newsCard.astro",
    "src\components\cards\subHeadlineCard.astro",
    "src\components\cards\mainHeadline.astro"
)

# Backup
git add .
git commit -m "Before auto-fix components"

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Fixing: $file"
        
        $content = Get-Content $file -Raw
        
        # Replace imports
        $content = $content -replace 'import type \{ CollectionEntry \} from "astro:content";', ''
        $content = $content -replace 'import \{ render \} from "astro:content";', ''
        
        # Replace type Props
        $content = $content -replace 'article: CollectionEntry<"articles">', 'article: any'
        
        # Replace article.data. with article.
        $content = $content -replace 'article\.data\.', 'article.'
        
        # Replace article.id with slug
        $content = $content -replace 'article\.id', 'article.slug?.current || article.slug'
        
        # Save
        Set-Content $file $content
        
        Write-Host "Fixed: $file"
    }
}

Write-Host "Done! Run 'npm run dev' to test."