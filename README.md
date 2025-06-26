# Brainfood Social AI Management Platform

## Backend


## Περιγραφή

Η εφαρμογή στοχεύει στη διαχείριση εταιρειών, των πακέτων υπηρεσιών (plans) που προσφέρουμε και του εμπορικού μοντέλου (σύνδεση εταιρειών με πακέτα). Το backend έχει υλοποιηθεί σε **Laravel**, ενώ το frontend σε **Angular 19**.

Η ανάπτυξη γίνεται σε τοπικό περιβάλλον!

---

## Περιεχόμενο της Βάσης Δεδομένων

### Πίνακες:

1. **ms_company** - Εταιρείες  
2. **ms_socialaiplans** - Πακέτα Social AI  
3. **ms_socialaicommercialmodel** - Ιστορικό πακέτων ανά εταιρεία

---

## Λειτουργικότητα Backend (Laravel)

- Διαχείριση Εταιρειών (`ms_company`)
  - Κατάλογος με:
    - Φίλτρα ανά πεδίο
    - Sorting
    - Pagination
  - Δημιουργία νέας εγγραφής:
    - Έλεγχος για μοναδικότητα ΑΦΜ
    - Επιστροφή σφάλματος αν υπάρχει ήδη

- Διαχείριση Πακέτων (`ms_socialaiplans`)
  - Κατάλογος με:
    - Φίλτρα ανά πεδίο
    - Sorting
    - Pagination
  - Δημιουργία νέου πακέτου:
    - Έλεγχος για μοναδικό `name`
    - Επιστροφή σφάλματος αν υπάρχει ήδη

- Διαχείριση Σύνδεσης Πακέτων με Εταιρείες (`ms_socialaicommercialmodel`)
  - Ιστορικό πακέτων ανά εταιρεία
  - Το πιο πρόσφατο πακέτο είναι ενεργό

- Αναφορές (Reports)
  - Τρέχον πακέτο ανά εταιρεία
  - Ιστορικό αγορών πακέτων ανά εταιρεία

---

## Λειτουργικότητα Frontend (Angular 19)

cd frontend
npm install
ng serve


- Πίνακας εταιρειών με:
  - Filters, Sorting, Pagination
  - Προσθήκη νέας εταιρείας με έλεγχο ΑΦΜ
  - Προβολή και σύνδεση πακέτων κάτω από κάθε εταιρεία

- Πίνακας πακέτων με:
  - Filters, Sorting, Pagination
  - Προσθήκη νέου πακέτου με έλεγχο μοναδικότητας `name`

- Εμφάνιση:
  - Ενεργού πακέτου ανά εταιρεία
  - Πλήρους ιστορικού πακέτων για κάθε εταιρεία

---

## Οδηγίες Εκκίνησης (Τοπικά)

### Backend (Laravel)

```bash
git clone <https://github.com/VKaramanis95/Brainfood.git>
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve



