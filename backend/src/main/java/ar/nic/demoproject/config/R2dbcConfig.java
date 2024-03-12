package ar.nic.demoproject.config;

import ar.nic.demoproject.db.model.Category;
import ar.nic.demoproject.db.model.Currency;
import ar.nic.demoproject.db.model.Transaction;
import ar.nic.demoproject.db.model.UserProfile;
import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.Row;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;

import java.math.BigInteger;
import java.time.DateTimeException;
import java.time.Instant;
import java.util.List;

@Configuration
public class R2dbcConfig extends AbstractR2dbcConfiguration {

    public ConnectionFactory connectionFactory() {
        return ConnectionFactories.get("r2dbc:…");
    }

    /**
     * Custom Objects Read/Write converters, usefully when joining tables.
     */
    @Override
    protected List<Object> getCustomConverters() {
        return List.of(
                new UserProfileReadingConverter(),
                new TransactionReadingConverter()
        );
    }

    //TODO This reader/writer should be in a custom package
    @ReadingConverter
    static class UserProfileReadingConverter implements Converter<Row, UserProfile> {
        @Override
        public UserProfile convert(final Row row) {
            final Currency currency = new Currency(row.get("currency_code", String.class));
            currency.setCurrencyDescription(row.get("currency_description", String.class));
            currency.setCurrencySymbol(row.get("currency_symbol", String.class));
            final UserProfile userProfile = new UserProfile(row.get("full_name", String.class),row.get("email", String.class));
            userProfile.setInternalId(row.get("internal_id", Integer.class));
            userProfile.setDefaultCurrency(currency);
            return userProfile;
        }
    }

    @WritingConverter
    static class UserProfileWritingConverter implements Converter<UserProfile, Row> {

        @Override
        public Row convert(final UserProfile userProfile) {
            return null;
        }
    }

    @ReadingConverter
    static class TransactionReadingConverter implements Converter<Row, Transaction> {
        @Override
        public Transaction convert(final Row row) {
            final Category category = new Category();
            category.setCategoryId(row.get("category_id", Integer.class));
            category.setCategoryName(row.get("category_name", String.class));
            final Transaction transaction = new Transaction();
            transaction.setId(row.get("transactionId", Integer.class));
            transaction.setUserInternalId(row.get("userInternalId", Integer.class));
            transaction.setAmount(row.get("amount", Float.class));
            transaction.setCurrency(row.get("currency", String.class));
            transaction.setDescription(row.get("description", String.class));
            transaction.setDate(row.get("date", Instant.class));
            if (category.getCategoryId()!=null){
                transaction.setCategory(category);
            }
            return transaction;
        }
    }
}

