[CmdletBinding()]
param([ValidateSet('All','MMCSS','BCD','Network','USB')][string]$Section = 'All')
. "$PSScriptRoot\PrimeBuild-Common.ps1"

try {
    Assert-PrimeBuildWindows
    Write-Output 'Prime Build v3.0 - inventario in sola lettura, non un benchmark di latenza.'
    Write-Output 'Prima di condividere il report, rimuovi identificativi, nomi macchina e indirizzi.'
    if ($Section -in @('All','MMCSS')) {
        Write-Output "`n=== MMCSS ==="
        Get-Service MMCSS | Format-List Name, Status, StartType | Out-String | Write-Output
        $profile = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile'
        Get-ItemProperty -LiteralPath $profile | Format-List | Out-String | Write-Output
        Get-ChildItem -LiteralPath "$profile\Tasks" | ForEach-Object {
            Get-ItemProperty -LiteralPath $_.PSPath | Format-List | Out-String | Write-Output
        }
        Write-Output 'I valori non provano che il gioco registri i suoi thread con MMCSS.'
    }
    if ($Section -in @('All','BCD')) {
        Write-Output "`n=== BCD: nessuna modifica ai timer o all'hypervisor ==="
        Assert-PrimeBuildAdmin
        & "$env:SystemRoot\System32\bcdedit.exe" /enum '{current}'
        if ($LASTEXITCODE -ne 0) { throw 'Lettura BCD fallita.' }
        Write-Output 'Senza lo stato precedente, cancellare valori non e un ripristino certificato.'
    }
    if ($Section -in @('All','Network')) {
        Write-Output "`n=== RETE ==="
        Get-NetAdapter | Format-Table Name, InterfaceDescription, Status, LinkSpeed -AutoSize | Out-String | Write-Output
        Get-NetQosPolicy -PolicyStore ActiveStore | Format-List | Out-String | Write-Output
        Write-Output 'DSCP e una marcatura: questo elenco non prova priorita sul router/Internet.'
    }
    if ($Section -in @('All','USB')) {
        & "$PSScriptRoot\PrimeBuild-USB.ps1"
        if ($LASTEXITCODE -ne 0) { throw 'Inventario USB fallito.' }
    }
    exit 0
} catch {
    Write-Error $_ -ErrorAction Continue
    exit 1
}
